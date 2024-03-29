package edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OfertaAcademicaResposeDto {
    private Long id;
    private UnidadEntity unidad_academica;
    private CarreraEntity carrera;
    private String modalidad;
    private String turno;
    private String periodo;

    private String realizado_por;
    private String actualizado_por;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_creacion;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_actualizacion;
}
