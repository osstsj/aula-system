package edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas;

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
@Table(name = "proyeccion_horas_sustantivas_atencion_alumnos_asignatura")
public class HorasSustantivasAtencionAlumnosAsignatura implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private Integer horas_frente_grupo;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasAsignaturaAsignatura horas_asignatura;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AcademiaAsignatura academias;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AsesoriaAsignatura asesorias;

    @Column
    private Integer actividades_complementarias;

    @Column
    private Integer subtotal_1;
}








