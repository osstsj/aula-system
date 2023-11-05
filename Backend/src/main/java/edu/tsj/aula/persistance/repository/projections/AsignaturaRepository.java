package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.projections.entity.ProyeccionEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsignaturaRepository  extends JpaRepository<AsignaturaEntity, Long> {
    @Query("SELECT AE FROM AsignaturaEntity as AE WHERE AE.unidad_academica= :unidad_academica")
    List<AsignaturaEntity> findAllByUnidad_academica(List<String> unidad_academica);

    @Query("SELECT AE FROM AsignaturaEntity as AE WHERE AE.proyeccion= :proyeccion")
    List<AsignaturaEntity> findAllByProyeccionId(ProyeccionEntity proyeccion);
}
