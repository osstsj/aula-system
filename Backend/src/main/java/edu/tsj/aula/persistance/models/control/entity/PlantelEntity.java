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
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "control_plantel")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PlantelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column private String tipo_unidad;

    @Column private String clave_dgp;

    @Column private String abreviatura;

    @Column private String nombre_corto;

    @Column private String nombre_completo;

    @Column private String direccion_completa;

//    @Column
//    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
////    @JoinColumn(name = "id", referencedColumnName = "id", insertable = true, updatable = true)
//    private List<ExtensionEntity> extensiones;


    @CreationTimestamp private LocalDateTime fecha_creacion;

    @UpdateTimestamp private LocalDateTime fecha_actualizacion;
}
