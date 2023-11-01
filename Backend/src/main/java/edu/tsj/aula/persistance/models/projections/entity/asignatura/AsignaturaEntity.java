package edu.tsj.aula.persistance.models.projections.entity.asignatura;

import com.fasterxml.jackson.annotation.*;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.ProfeAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasSustantivasAtencionAlumnos;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.necesidad.HorasNecesidadInstitucional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyecion_asignatura")
public class AsignaturaEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @JoinColumn(name = "id", nullable = false)
//    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
//    @JsonIdentityReference(alwaysAsId=true)
//    @JsonProperty("id_plantel")
//    private PlantelEntity unidad_academica;
//    Se debe relacionar la tabla plantel con proyeccion ya que si en un futuro cambia de nombre UA
//    causara conflicto por no actualizarse el string que contiene el nombre de la unidad en
//    la comparacion las proyeccion

    @Column
    private String unidad_academica;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private ProfeAsignatura profe_asignatura;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasSustantivasAtencionAlumnos horas_sustantivas_atencion_alumnos;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasNecesidadInstitucional horas_necesidad_institucional;

    @Column
    private Integer total;

    @Column
    private String observaciones;

    @CreationTimestamp private LocalDateTime fecha_creacion;

    @UpdateTimestamp  private LocalDateTime fecha_actualizacion;
}