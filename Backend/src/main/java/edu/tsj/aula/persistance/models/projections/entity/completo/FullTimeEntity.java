package edu.tsj.aula.persistance.models.projections.entity.completo;


import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.necesidad.HorasNecesidadInstitucionalFulltime;
import edu.tsj.aula.persistance.models.projections.entity.completo.profesor.ProfesorFulltimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.sustantivas.HorasSustantivasAtencionAlumnosFulltime;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
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

    /*
        ************ SI SE DESEA SOLO TRAER EL ID DEL OBJETO SE DEBE SEGUIR LA SIGUIENTE ESTRUCTURA
        * YA QUE POR EL MOMENTO TRAE EL OBJETO COMPLETO (En algunos caso inecesario)
        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @OnDelete(action = OnDeleteAction.CASCADE) ///    Tal vez deba quitarse ya que se realaciona con la proyeccion
        @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
        @JsonIdentityReference(alwaysAsId=true)
        @JsonProperty("id_proyeccion")
        @JoinColumn(name = "id_carrera", nullable = false)
        private CarreraEntity clave_programa;
    */


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_unidad", nullable = false)
    private UnidadEntity unidad_academica;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private ProfesorFulltimeEntity profesor_fulltime;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasSustantivasAtencionAlumnosFulltime horas_sustantivas_atencion_alumnos_fulltime;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasNecesidadInstitucionalFulltime horas_necesidad_institucional_fulltime;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIdentityReference(alwaysAsId=true)
    @JoinColumn(name = "id_folio", nullable = false)
    private FolioFulltimeEntity folio;

    @Column
    private Integer Total;

    @CreationTimestamp
    private LocalDateTime fecha_creacion;

    @UpdateTimestamp
    private LocalDateTime fecha_actualizacion;

    @Column
    private String observaciones;
}


