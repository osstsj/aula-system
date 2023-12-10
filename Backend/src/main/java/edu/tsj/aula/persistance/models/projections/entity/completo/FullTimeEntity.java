package edu.tsj.aula.persistance.models.projections.entity.completo;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.projections.entity.completo.necesidad.HorasNecesidadInstitucionalFulltime;
import edu.tsj.aula.persistance.models.projections.entity.completo.profesor.ProfesorFulltimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.sustantivas.HorasSustantivasAtencionAlumnosFulltime;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
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

    @JoinColumn(name = "id_profesor")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private ProfesorFulltimeEntity profesor_fulltime;

    @JoinColumn(name = "id_horas_sustantivas")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasSustantivasAtencionAlumnosFulltime horas_sustantivas_atencion_alumnos_fulltime;

    @JoinColumn(name = "id_horas_necesidad")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private HorasNecesidadInstitucionalFulltime horas_necesidad_institucional_fulltime;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIdentityReference(alwaysAsId=true)
    @JoinColumn(name = "id_folio", nullable = false)
    private FolioFulltimeEntity folio;

    @Column private Integer Total;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_creacion;

    @Column private String observaciones;


    // ------- seccion de cambios ------------
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_actualizacion;

    @Column private Integer carga_horaria_anterior;
    @Column private String nivel_ptc_anterior;
    @Column private Integer carga_horaria_nueva;
    @Column private String nivel_ptc_nuevo;
    @Column private String modificacion_aplica_a_partir_de;   // 2da etapa
    @Column private String no_oficio_respuesta;               // 2da etapa
    @Column private String no_de_oficio_academia;             // 2da etapa
    @Column private String fecha_en_que_aplica_sistema;       // 2da etapa
    @Column private String observacion_modificacion;

    @Column private String realizado_por;
    @Column private String actualizado_por;
}


