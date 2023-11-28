package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarreraPorUnidadRepository extends JpaRepository<CarreraPorUnidadEntity, Long> {
    @Query("SELECT COUNT(A.profe_asignatura.clave_programa.id) FROM AsignaturaEntity AS A " +
            "WHERE A.profe_asignatura.clave_programa.id= :id_carrera_por_unidad")
    Integer checkCarreraPorUnidadDependersAsignatura(Long id_carrera_por_unidad);

    @Query("SELECT COUNT(FT.profesor_fulltime.clave_programa.id) FROM FullTimeEntity AS FT " +
            "WHERE FT.profesor_fulltime.clave_programa.id= :id_carrera_por_unidad")
    Integer checkCarreraPorUnidadDependersFolioFulltime(Long id_carrera_por_unidad);

    @Query("SELECT CUEntity FROM CarreraPorUnidadEntity AS CUEntity WHERE CUEntity.unidad_academica.id= :id_unidad")
    List<CarreraPorUnidadEntity> getCarreraPorUnidadEntitiesByUnidad_academicaId(Long id_unidad);
}
