package edu.tsj.aula.persistance.models.projections.entity.asignatura;

import com.fasterxml.jackson.annotation.*;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.profesor.ProfeAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas.HorasSustantivasAtencionAlumnosAsignatura;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.necesidad.HorasNecesidadInstitucionalAsignatura;
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
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyeccion_asignatura")
public class AsignaturaEntity  implements Serializable {

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

    @JoinColumn(name = "id_profe")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private ProfeAsignatura profe_asignatura;

    @JoinColumn(name = "id_horas_sustantivas_atencion_alumnos")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasSustantivasAtencionAlumnosAsignatura horas_sustantivas_atencion_alumnos;

    @JoinColumn(name = "id_horas_necesidad_institucional") // si deja solo "id", tomara por default el primary key
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasNecesidadInstitucionalAsignatura horas_necesidad_institucional;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE) ///     aqui nace la dependencia de las entidades de la proyeccion
    @JoinColumn(name = "id_folio", nullable = false)
    private FolioAsignaturaEntity folio;

    @Column private Integer total;

    @Column private String observaciones;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_creacion;

    // ------- seccion de cambios ------------
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_actualizacion;

    @Column private Integer carga_horaria_anterior;
    @Column private String categoria_horas_asignatura_anterior;
    @Column private Integer carga_horaria_nueva;
    @Column private String categoria_tipo_horas_asignatura_nueva;
    @Column private String modifica_aplica_en;       // 2da etapa
    @Column private String oficio_respuesta;         // 2da etapa
    @Column private String oficio_academia;          // 2da etapa
    @Column private String fecha_rh_aplica_sistema;  // 2da etapa
    @Column private String observaciones_modificacion;
}
