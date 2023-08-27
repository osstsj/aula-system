package edu.tsj.aula.model.enums;

public enum CarreraStatus {
    INICIATIVA("INICIATIVA"),
    ACTIVA("ACTIVA");

    private final String estatus;

    CarreraStatus(String estatus) {
        this.estatus = estatus;
    }

    public String getEstatus() {
        return estatus;
    }
}
