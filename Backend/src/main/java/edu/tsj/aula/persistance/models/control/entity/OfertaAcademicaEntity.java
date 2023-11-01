package edu.tsj.aula.persistance.models.control.entity;

import lombok.AllArgsConstructor;
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
@Entity
@Table(name = "control_oferta_academica")
public class OfertaAcademicaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String unidad;

    @Column private String carrera;

    @Column private String modalidad;

    @Column private String turno;

    @Column private String periodo;

    @CreationTimestamp private LocalDateTime fecha_creacion;

    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
