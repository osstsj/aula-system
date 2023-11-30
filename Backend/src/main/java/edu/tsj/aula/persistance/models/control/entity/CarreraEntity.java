package edu.tsj.aula.persistance.models.control.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.Column;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "control_carrera_control")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CarreraEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String abreviatura;

    @Column private String nombre;

    @Column private Integer dgp;

    @Column private String plan_estudio;

    @Column private String estatus;

    @Column private String clave_programa;

    @Column private String realizado_por;
    @Column private String actualizado_por;

    @CreationTimestamp private LocalDateTime fecha_creacion;
    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
