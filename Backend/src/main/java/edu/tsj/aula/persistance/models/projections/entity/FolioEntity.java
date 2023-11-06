package edu.tsj.aula.persistance.models.projections.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "proyeccion")
public class FolioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private String tipo_proyeccion;

    //    @Column(unique = true)

    @Column
    private String letra;
    @Column
    private Integer numero;
    @Column
    private Integer periodo;
    @Column
    private String periodoAoB;
    @Column
    private String folio;

    @CreationTimestamp
    private LocalDateTime fecha_creacion;
//
//    @UpdateTimestamp
//    private LocalDateTime fecha_actualizacion;
}

