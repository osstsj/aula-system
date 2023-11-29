package edu.tsj.aula.persistance.models.projections.entity.completo;

public interface IComparacionFulltimeDto {
    // -> https://thorben-janssen.com/spring-data-jpa-dto-native-queries/ (proyections)
    String getNombre_Ua();
    String getNombre_Docente();
    Integer getCom_Horas_grupo();
    Integer getCom_Total();
}
