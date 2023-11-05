package edu.tsj.aula.persistance.models.projections.entity.completo;


import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.projections.entity.ProyeccionEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.necesidad.HorasNecesidadInstitucionalFulltime;
import edu.tsj.aula.persistance.models.projections.entity.completo.profesor.ProfesorFulltimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.sustantivas.HorasSustantivasAtencionAlumnosFulltime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyeccion_fultime")
public class FullTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private ProfesorFulltimeEntity profesorFulltime;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasSustantivasAtencionAlumnosFulltime sustantivasAtencionAlumnosFulltime;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasNecesidadInstitucionalFulltime horasNecesidadInstitucionalFulltime;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE) ///    Tal vez deba quitarse ya que se realaciona con la proyeccion
//    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
//    @JsonProperty("id_proyeccion")
    @JoinColumn(name = "id_proyeccion", nullable = false)
    private ProyeccionEntity proyeccion;

    @Column
    private Integer Total;

    @CreationTimestamp
    private LocalDateTime fecha_creacion;

    @UpdateTimestamp
    private LocalDateTime fecha_actualizacion;

    @Column
    private String observaciones;
}