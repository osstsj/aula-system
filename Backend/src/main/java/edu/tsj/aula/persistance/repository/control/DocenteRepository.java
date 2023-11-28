package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface DocenteRepository extends JpaRepository<DocenteEntity, Long> {
    @Query("SELECT DE FROM DocenteEntity as DE WHERE DE.unidad_academica.id= :id_unidad")
    List<DocenteEntity> findAllByUnidad(Long id_unidad);

    @Query("SELECT DE FROM DocenteEntity as DE WHERE (DE.unidad_academica.id=:id_unidad AND DE.estatus = 'Activo')" +
            "AND (DE.categoria= 'PROFESOR ASIGNATURA - A' " +
            "OR DE.categoria= 'PROFESOR ASIGNATURA - B')")
    List<DocenteEntity> findAllByCategoriaPTCAsignatura(Long id_unidad);

    @Query("SELECT DE FROM DocenteEntity as DE WHERE (DE.unidad_academica.id=:id_unidad AND DE.estatus = 'Activo')" +
            "AND (DE.categoria= 'PROFESOR ASOCIADO - A' " +
            "OR DE.categoria= 'PROFESOR ASOCIADO - B' OR DE.categoria= 'PROFESOR ASOCIADO - C')")
    List<DocenteEntity> findAllByCategoriaPTCFulltime(Long id_unidad);

    @Query("SELECT COUNT(A.profe_asignatura.nombre_docente.id) FROM AsignaturaEntity AS A WHERE A.profe_asignatura.nombre_docente.id= :id_docente")
    Integer checkDocenteDependersAsignatura(Long id_docente);

    @Query("SELECT COUNT(FT.profesor_fulltime.nombre_docente.id) FROM FullTimeEntity AS FT WHERE FT.profesor_fulltime.nombre_docente.id= :id_docente")
    Integer checkFulltimeDependersFulltime(Long id_docente);
}
