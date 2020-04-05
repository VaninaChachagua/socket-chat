class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        };
        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(pers => {
            return pers.id === id;
        })[0];

        //Si no encuentra queda undefined
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        });
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        });
        return personaBorrada;
    }


}

module.exports = {
    Usuarios
};