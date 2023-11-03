package edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas;

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
@Table(name = "proyeccion_profe_asignatura")
public class ProfeAsignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String clave_programa;

//    @Column(unique = true)
    @Column
    private String codigo_nomina;

    @Column
    private String grado_academico;

    @Column
    private String nombre_docente;
}
