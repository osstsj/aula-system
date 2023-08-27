package edu.tsj.aula.model;

import edu.tsj.aula.model.enums.CarreraStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "carrera")
public class CarreraEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String abreviatura;

    @Column(unique = true)
    private String nombre;

    @Column(unique = true)
    private Long DGP;

    @Column(unique = true)
    private String planDeEstudio;

    @Column
    private CarreraStatus estatus;
}
