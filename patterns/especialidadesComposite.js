class Especialidad {
    constructor(nombre) {
        this.nombre = nombre;
    }

    mostrar() {
        return this.nombre;
    }
}

class GrupoEspecialidades {
    constructor(nombre) {
        this.nombre = nombre;
        this.especialidades = [];
    }

    agregar(especialidad) {
        this.especialidades.push(especialidad);
        
    }

    mostrar() {
        return {
            grupo: this.nombre,
            especialidades: this.especialidades.map(e => e.mostrar())
        };
    }
}

module.exports = {
    Especialidad,
    GrupoEspecialidades
};