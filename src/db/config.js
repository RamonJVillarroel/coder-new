const env = require('../../env.config');

module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://ecommerce:${env.DB_PASSWORD}@ecommerce.vnr307k.mongodb.net/${database}?retryWrites=true&w=majority
    `,
  }
  // Change here for your mongo atlas account's URI
}