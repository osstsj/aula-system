package edu.tsj.aula.persistance.models.control.entity;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "control_area")
public class AreaEscolarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String area;

    @Column private String responsable;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityReference(alwaysAsId=true)
    @JoinColumn(name = "id_unidad", nullable = false)
    private UnidadEntity unidad_academica;

    @Column private String realizado_por;
    @Column private String actualizado_por;

    @CreationTimestamp private LocalDateTime fecha_creacion;
    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
