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

    private String tipoUnidad;
    private String clave_dgp;
    private String abreviatura;
    private String nombreCorto;
    private String nombreCompleto;
    private String  nombre_extension;
    private String direccionCompleta;

    @CreationTimestamp
    private LocalDateTime fechaCreacion;
}
