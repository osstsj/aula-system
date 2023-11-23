package edu.tsj.aula.persistance.models.projections.entity.asignatura.necesidad;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyeccion_asignatura_horas_necesidad_institucional")
public class HorasNecesidadInstitucionalAsignatura implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private Integer invesigacion_educativa;

    @Column private Integer apoyo_operativo;

    @Column private Integer subtotal_2;
}
