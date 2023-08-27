package edu.tsj.aula.model.enums;

public enum Modalidad {
    ESCOLARIZADA("ESCOLARIZADA"),
    MIXTA("MIXTA");

    private final String modalidad;

    Modalidad(String modalidad) {
        this.modalidad = modalidad;
    }

    public String getModalidad() {
        return modalidad;
    }
}
