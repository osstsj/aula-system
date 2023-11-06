package edu.tsj.aula.persistance.models.projections.entity.asignatura.profesor;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyeccion_profe_asignatura")
public class ProfeAsignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private CarreraEntity carreraEntity; aplicar compueso como en folio
    //para que cuando haya una actualizacion, tambien se actualize por este lado
//    @Column
//    private String clave_programa;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE) ///    Tal vez deba quitarse ya que se realaciona con la proyeccion
//    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
//    @JsonProperty("id_proyeccion")
    @JoinColumn(name = "id_carrera", nullable = false)
    private CarreraEntity clave_programa;

//    @Column(unique = true)
    @Column
    private String codigo_nomina;

    @Column
    private String grado_academico;


//    private DocenteEntity docente; aplicar compueso como en folio
//    @Column
//    private String nombre_docente;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE) ///    Tal vez deba quitarse ya que se realaciona con la proyeccion
//    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
//    @JsonProperty("id_proyeccion")
    @JoinColumn(name = "id_docente", nullable = false)
    private DocenteEntity nombre_docente;
}
