package edu.tsj.aula.persistance.models.projections.entity.asignatura;

public interface IComparacionAsignaturaDto {
    // -> https://thorben-janssen.com/spring-data-jpa-dto-native-queries/ (proyections)
    String getNombre_Ua();
    String getNombre_Docente();
    Integer getCom_Subtotal_1();
    Integer getCom_Subtotal_2();
    Integer getCom_Total();
}
