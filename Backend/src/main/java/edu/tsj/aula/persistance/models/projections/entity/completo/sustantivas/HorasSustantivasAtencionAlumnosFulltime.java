package edu.tsj.aula.persistance.models.projections.entity.completo.sustantivas;

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
@Table(name = "proyeccion_fulltime_horas_sustantivas_atencion_alumnos")
public class HorasSustantivasAtencionAlumnosFulltime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String ptc;

    @Column private Integer horas_frente_grupo;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AcademiaFullTime academias;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AsesoriasFulltime asesorias;

    @Column private Integer actividades_complementarias;

    @Column private Integer subtotal_1;
}
