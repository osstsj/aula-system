package edu.tsj.aula.persistance.models.control.dto.docenteDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DocenteRequestDto {

    private String nombre;

    private String apellido_paterno;

    private String apellido_materno;

    private UnidadEntity unidad_academica;

    private String nombre_completo;

    private String categoria;

    private String actividad;

    private String estatus;

    private String codigo_nomina;

    private String grado_academico;

    private Integer ultima_horas;
    private String folio_ultimo_registro_y_tipo_folio;
    private String realizado_por;
    private String actualizado_por;
}
