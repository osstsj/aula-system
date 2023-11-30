package edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OfertaAcademicaRequestDto {
    private UnidadEntity unidad_academica;
    private CarreraEntity carrera;
    private String modalidad;
    private String turno;
    private String periodo;

    private String realizado_por;
    private String actualizado_por;
}
