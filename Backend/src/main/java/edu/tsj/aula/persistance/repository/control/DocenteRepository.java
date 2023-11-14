package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocenteRepository extends JpaRepository<DocenteEntity, Long> {
    @Query("SELECT DE FROM DocenteEntity as DE WHERE DE.unidad_academica.id= :id_unidad")
    List<DocenteEntity> findAllByUnidad(Long id_unidad);

    @Query("SELECT DE FROM DocenteEntity as DE WHERE DE.categoria= 'PROFESOR ASIGNATURA A' " +
            "OR DE.categoria= 'PROFESOR ASIGNATURA B'")
    List<DocenteEntity> findAllByCategoriaAsignatura(List<String> ptc);
    // preguntar a control E. sobre el filtro en proyecciones de asignatura
    // o excluir los docentes de PTC Tiempo completo?

    @Query("SELECT DE FROM DocenteEntity as DE WHERE DE.unidad_academica.id=:id_unidad AND (DE.categoria= 'PROFESOR ASOCIADO A' " +
            "OR DE.categoria= 'PROFESOR ASOCIADO B' OR DE.categoria= 'PROFESOR ASOCIADO C')")
    List<DocenteEntity> findAllByCategoriaPTC(Long id_unidad);
}
