package edu.tsj.aula.persistance.models.projections.entity.asignatura.profesor;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
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
@Table(name = "proyeccion_profe_asignatura")
public class ProfeAsignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private CarreraEntity carreraEntity; aplicar compueso como en folio
    //para que cuando haya una actualizacion, tambien se actualize por este lado
    @Column
    private String clave_programa;

//    @Column(unique = true)
    @Column
    private String codigo_nomina;

    @Column
    private String grado_academico;


//    private DocenteEntity docente; aplicar compueso como en folio
    @Column
    private String nombre_docente;
}
