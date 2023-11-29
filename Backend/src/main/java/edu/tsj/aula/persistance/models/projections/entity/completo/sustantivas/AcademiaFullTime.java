package edu.tsj.aula.persistance.models.projections.entity.completo.sustantivas;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "proyeccion_fultime_proyecion_academia")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AcademiaFullTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer presidente;

    @Column
    private Integer secretario;
}
