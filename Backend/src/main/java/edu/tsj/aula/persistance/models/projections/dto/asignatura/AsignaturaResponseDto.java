package edu.tsj.aula.persistance.models.projections.dto.asignatura;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.necesidad.HorasNecesidadInstitucional;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasSustantivasAtencionAlumnos;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.ProfeAsignatura;
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
public class AsignaturaResponseDto {
    private Long id;

    private String unidad_academica;

    private ProfeAsignatura profe_asignatura;

    private HorasSustantivasAtencionAlumnos horas_sustantivas_atencion_alumnos;

    private HorasNecesidadInstitucional horas_necesidad_institucional;

    private Integer total;

    private String observaciones;

    private LocalDateTime fecha_creacion;

    private LocalDateTime fecha_actualizacion;
}
