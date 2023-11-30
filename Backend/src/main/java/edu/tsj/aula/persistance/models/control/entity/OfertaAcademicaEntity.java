package edu.tsj.aula.persistance.models.control.entity;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityReference(alwaysAsId=true)
    @JoinColumn(name = "id_unidad", nullable = false)
    private UnidadEntity unidad_academica;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_carrera", nullable = false)
    private CarreraEntity carrera;

    @Column private String modalidad;

    @Column private String turno;

    @Column private String periodo;

    @Column private String realizado_por;
    @Column private String actualizado_por;

    @CreationTimestamp private LocalDateTime fecha_creacion;
    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
