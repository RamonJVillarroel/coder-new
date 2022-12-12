
let container = document.getElementById("registro")

let card = document.createElement("div")
card.innerHTML = ` <form action="/registro" method="post" autocomplete="off">
        <div class="form-group">
            <label for="nombre">Ingrese su nombre</label>
            <input id="nombre" class="form-control" type="text" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="nombre">email</label>
            <input id="email" class="form-control" type="text" name="email" required>
        </div>
        <div class="form-group">
            <label for="nombre">contraseña</label>
            <input id="password" class="form-control" type="text" name="password" required>
        </div>
        <button class="btn btn-success mt-3">registrar</button>
    </form>

    `

container.appendChild(card)
