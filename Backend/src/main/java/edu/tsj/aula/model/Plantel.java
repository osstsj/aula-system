package edu.tsj.aula.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "plantel")
public class Plantel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String tipoUnidad;

    @Column(unique = true)
    private String clave_dgp;

    @Column(unique = true)
    private String abreviatura;

    @Column(unique = true)
    private String nombreCorto;

    @Column(unique = true)
    private String nombreCompleto;

//    @Column(unique = true)
    private String  nombre_extension;

    @Column(unique = true)
    private String direccionCompleta;

    @CreationTimestamp
    private LocalDateTime fechaCreacion;
}
