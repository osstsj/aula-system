package edu.tsj.aula.persistance.models.projections.entity.completo.necesidad;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyeccion_fulltime_horas_necesidad_institucional")
public class HorasNecesidadInstitucionalFulltime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer proyecto_investigacion;

    @Column
    private Integer apoyo_operativo;

    @Column
    private Integer subtotal_2;

}
