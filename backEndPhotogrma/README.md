# Photogram

Clon instagram

## ENDPOINTS API

Usuarios

- POST - /users/signup -Crear un usuario pendiente de activar.
- POST - /users/login -Logear un usuario y obtener el token.
- POST - /users/validate/:registration_code -Validar un usuario.
- GET - /user/:id -Obtener información de un usuario. Token obligatorio.
- PUT - /users/edit/:id -Editar datos usuario. Token obligatorio. Solo se edita el propio usuario o admin.
- DELETE - /users/delete/:id -Borrado lógico. Token obligatorio
- PUT - /users/password/:id -Cambiar contraseña. Token obligatorio
- POST - /users/recover_password -Recuperar contraseña. email obligatorio.
- POST - /users/reset_password -Pide el código de recuperación y nueva password.

Publicaciones

- GET - /entries -Obtener las publicaiones de más reciente a más antigua. Token obligatorio.
- POST -/entries -Publicar una entrada. FOTO(obligatorio) Descripción (opcional)Token obligatorio.
- GET - /entries/:id -Obtener las propias publicaciones del usuario. Token obligatorio.
- PUT - /entries/edit/:id -Modificar una publicación propia del usuario. Token obligatorio.
- DELETE - /entries/delete/:id -Eliminar una publicación incluidos los comentarios. Token obligatorio. Borrado en cascada.
- POST - /entries/vote/:id -Reaccionar a una publicación. -Token obligatorio.
