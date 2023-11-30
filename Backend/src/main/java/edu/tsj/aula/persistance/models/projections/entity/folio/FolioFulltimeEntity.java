package edu.tsj.aula.persistance.models.projections.entity.folio;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
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
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "folio_fulltime")
public class FolioFulltimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_unidad", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UnidadEntity unidad_academica;

    @Column private Integer numero;

    @Column private Integer periodo;

    @Column private String periodoAoB;

    @Column private String folio;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_creacion;

    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fecha_actualizacion;

    // se puede agregar un boton (ver detalle de folio) ademas de los existentes (Ver Proyecciones, Elimnar Proyeccion)
    // para que se muestre el usuario que creo el folio, con fecha y horas de creacion
    // Nota, el folio no puede ser elimnado si ya esta presente en una proyeccion de un docente...
    @Column private String realizado_por;
    @Column private String actualizado_por;
}
