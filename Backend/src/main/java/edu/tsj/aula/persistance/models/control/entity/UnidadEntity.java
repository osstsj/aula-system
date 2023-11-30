package edu.tsj.aula.persistance.models.control.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "control_unidad")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UnidadEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String tipo_unidad;

    @Column private String clave_dgp;

    @Column private String abreviatura;

    @Column private String nombre_corto;

    @Column private String nombre_completo;

    @Column private String direccion_completa;

    @Column private String realizado_por;
    @Column private String actualizado_por;

    @CreationTimestamp private LocalDateTime fecha_creacion;
    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
