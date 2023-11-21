package edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "proyeccion_asignatura_proyecion_academia")
public class AcademiaAsignatura implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer presidente;

    @Column
    private Integer secretario;
}
