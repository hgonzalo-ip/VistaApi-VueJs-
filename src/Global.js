export var  Global = {
    URL: 'http://localhost/SalonBer/SalonApi/public/api/auth/',
    Token : 'Bearer ' + localStorage.getItem("access_token"),
    IdTipoUser : localStorage.getItem("IdTipoUser"),
    IdUsuario : localStorage.getItem("IdUsuario")
}