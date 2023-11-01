package edu.tsj.aula.persistance.models.projections.entity.asignatura.sustantivas;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "proyecion_horas_asignatura")
public class HorasAsignatura implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer A;

    @Column
    private Integer B;

}