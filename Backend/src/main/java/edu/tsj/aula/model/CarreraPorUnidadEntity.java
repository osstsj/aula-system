package edu.tsj.aula.model;

import edu.tsj.aula.model.enums.Modalidad;
import edu.tsj.aula.model.enums.Nivel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "carreraPorUnidad")
public class CarreraPorUnidadEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "carreraPorUnidad_id")
    private List<CarreraEntity> carreraEntitiesList;
    // Note: when we consult the with Lazy, what we do is to consult only item List

    @Column
    private Nivel nivel;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "carrerasPorUnidad_id")
    private List<PlantelEntity> plantelEntities;

    @Column
    private Modalidad modalidad;
}