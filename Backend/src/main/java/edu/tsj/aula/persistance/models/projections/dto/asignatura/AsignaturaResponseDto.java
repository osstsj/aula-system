package edu.tsj.aula.persistance.models.projections.dto.asignatura;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.necesidad.HorasNecesidadInstitucionalAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.profesor.ProfeAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasSustantivasAtencionAlumnosAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
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

    private UnidadEntity unidad_academica;

    private ProfeAsignatura profe_asignatura;

    private HorasSustantivasAtencionAlumnosAsignatura horas_sustantivas_atencion_alumnos;

    private HorasNecesidadInstitucionalAsignatura horas_necesidad_institucional;

    private FolioAsignaturaEntity folio;

    private Integer total;

    private String observaciones;

    private LocalDateTime fecha_creacion;


    // ------- seccion de cambios ------------
    private LocalDateTime fecha_actualizacion;
    private Integer carga_horaria_anterior;
    private String categoria_horas_asignatura_anterior;
    private Integer carga_horaria_nueva;
    private String categoria_tipo_horas_asignatura_nueva;
    private String observaciones_modificacion;
}
