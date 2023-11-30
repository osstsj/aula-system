package edu.tsj.aula.persistance.models.control.entity;

import com.fasterxml.jackson.annotation.*;
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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "control_extension")
public class ExtensionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column private String tipo_unidad;

    @Column private String clave_dgp;

    @Column private String abreviatura;

    @Column private String nombre_corto;

    @Column private String nombre_completo;

    @Column private String direccion_completa;


    // Con esta instruccion se muestra solo en el modelo el "id_unidad" en lugar de toda la entidad con sus atributos
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_unidad", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JsonProperty("id_unidad")
    private UnidadEntity unidad;

    @Column private String realizado_por;
    @Column private String actualizado_por;

    @CreationTimestamp private LocalDateTime fecha_creacion;
    @UpdateTimestamp private LocalDateTime fecha_actualizacion;

}
