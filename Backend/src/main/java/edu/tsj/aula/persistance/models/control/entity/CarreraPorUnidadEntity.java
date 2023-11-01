package edu.tsj.aula.persistance.models.control.entity;


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
@Table(name = "control_carrera_por_unidad")
public class CarreraPorUnidadEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String carrera_nombre;

    @Column private String nivel;

    @Column private String unidad_academica;

    @Column private String modalidad;

    @CreationTimestamp private LocalDateTime fecha_creacion;

    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
