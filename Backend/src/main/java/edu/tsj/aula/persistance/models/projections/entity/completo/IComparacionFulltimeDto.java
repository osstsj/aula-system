package edu.tsj.aula.persistance.models.projections.entity.completo;

public interface IComparacionFulltimeDto {
    // -> https://thorben-janssen.com/spring-data-jpa-dto-native-queries/ (JPA Proyections)
    String getNombre_Ua();
    String getNombre_Docente();

    Integer getHoras_Grupo_1();
    Integer getHoras_Grupo_2();
    Integer getCom_Horas_Grupo();

    Integer getTotal_1();
    Integer getTotal_2();
    Integer getCom_Total();

    String getBandera();
}
