const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../util/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesaio'
            });
        }
        client.join(data.sala);
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
        //Debe ser enviado a las personas del chat
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        //retornar
        callback(usuarios.getPersonasPorSala(data.sala));
        console.log(personas);

    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    //Mensaje privado
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona, data.mensaje));
    });

});