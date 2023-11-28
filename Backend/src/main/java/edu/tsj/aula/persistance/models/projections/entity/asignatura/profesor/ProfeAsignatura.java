package edu.tsj.aula.persistance.models.projections.entity.asignatura.profesor;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;
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
@Table(name = "proyeccion_asignatura_profe")
public class ProfeAsignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_carrera", nullable = false)
    private CarreraPorUnidadEntity clave_programa;

    @Column private String grado_academico;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_docente", nullable = false)
    private DocenteEntity nombre_docente;
//    @Column private String codigo_nomina; se optiene de docente

}
