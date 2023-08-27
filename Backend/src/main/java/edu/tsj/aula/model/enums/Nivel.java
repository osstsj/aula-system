package edu.tsj.aula.model.enums;

public enum Nivel {
    LICENCIATURA("LICENCIATURA"),
    INGENIERIA("INGENIERIA");

    private final String nivel;

    Nivel(String nivel) {
        this.nivel = nivel;
    }

    public String getNivel() {
        return nivel;
    }
}
