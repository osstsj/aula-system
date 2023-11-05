package edu.tsj.aula.persistance.models.projections.dto.asignatura.sustantivas;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.AcademiaAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.AsesoriaAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasAsignaturaAsignatura;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class HorasSustantivasAtencionAlumnosDto {
    private Integer horas_frente_grupo;

    private HorasAsignaturaAsignatura horas_asignatura;

    private AcademiaAsignatura academias;

    private AsesoriaAsignatura asesorias;

    private Integer actividades_complementarias;

    private Integer subtotal_1;
}
