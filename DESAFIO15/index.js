const express = require ('express');
const { Server: HttpServer } = require ('http');
const { Server: SocketServer } = require ('socket.io');
const Products = require("./models/data");
const Messages = require ('./models/messages')
const dbConfig = require ('./db/config')
const routes = require('./routers/app.routers')
const MongoStore = require('connect-mongo')
const envConfig = require ('./env.config');
const passport = require('./middlewares/passport');
const MongoContainer = require('./models/containers/Mongodb.container')
const cluster = require('cluster');
const os = require('os');


const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsDB = new Products('products', dbConfig.mariaDB);
const messagesDB = new Messages("messages", dbConfig.sqlite)
const session = require('express-session');
const clusterMode = process.argv[3]==="CLUSTER" || "FORK";
//Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Configuracion de Sessions
app.use(session({
  secret: envConfig.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('sessions')
  }),
  cookie: {
      maxAge: 60000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

//Motor de plantilla
app.set('view engine', 'ejs');

//Routes
app.use(routes)


//Variable
const users = [];

//Socket
io.on("connection", async (socket) => {
    console.log(`New User conected!`);
    console.log(`User ID: ${socket.id}`)

//socket.emit('server-message', "Mensaje desde el servidor")
   const products = await productsDB.getAll();
   socket.emit('products', products);

   socket.on('newProduct', async (newProduct) => {
       await productsDB.save(newProduct);
       const updateProducts = await productsDB.getAll(); 
       io.emit('products', updateProducts)      
    });   


    /* io.emit("message", [...messages]); */

    socket.on("new-user", (username) => {
     const newUser = {
       id: socket.id,
       username: username,
     };
     users.push(newUser);
    });
    
    const messages= await messagesDB.getMessages();
    socket.emit("messages", messages);
    /* console.log(messages) */
    socket.on("new-message", async (msj) => {
        await messagesDB.addMessage({email: msj.user, message: msj.message, date: new Date().toLocaleDateString()});
        const messagesLog = await messagesDB.getMessages();
        io.emit("messages", {messagesLog});
    })
})


if(clusterMode && cluster.isPrimary ){
  const cpus = os.cpus().length;
  for(let i =0; i <= cpus; i++){
     cluster.fork();
  }
}else{
  //Conexión del Servidor
const connectedServer = httpServer.listen(PORT, () => {
    MongoContainer.connect()
    console.log(`🚀Server active and runing on port: ${PORT}`);
  });
  
  connectedServer.on("error", (error) => {
    console.log(`error:`, error.message);
  });
}
