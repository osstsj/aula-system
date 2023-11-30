package edu.tsj.aula.persistance.models.projections.entity.asignatura;

public interface IComparacionAsignaturaDto {
    // -> https://thorben-janssen.com/spring-data-jpa-dto-native-queries/ (JPA Proyections)
    String getNombre_Ua();
    String getNombre_Docente();

    Integer getSubtotal_1_1();
    Integer getSubtotal_1_2();
    Integer getCom_Subtotal_1();

    Integer getSubtotal_2_1();
    Integer getSubtotal_2_2();
    Integer getCom_Subtotal_2();

    Integer getTotal_1();
    Integer getTotal_2();
    Integer getCom_Total();

    String getBandera();
}
