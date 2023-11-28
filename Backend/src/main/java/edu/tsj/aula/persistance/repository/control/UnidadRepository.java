package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadRepository extends JpaRepository<UnidadEntity, Long> {
    @Query("SELECT COUNT(DE.unidad_academica.id) FROM DocenteEntity AS DE WHERE DE.unidad_academica.id= :id_unidad")
    Integer checkUnidadDependersDocente(Long id_unidad);

    @Query("SELECT COUNT(EX.unidad.id) FROM ExtensionEntity AS EX WHERE EX.unidad.id= :id_unidad")
    Integer checkUnidadDependersExtensiones(Long id_unidad);

    @Query("SELECT COUNT(CU.unidad_academica.id) FROM CarreraPorUnidadEntity AS CU WHERE CU.unidad_academica.id= :id_unidad")
    Integer checkUnidadDependersCarreraPorUnidad(Long id_unidad);

    @Query("SELECT COUNT(OA.unidad_academica.id) FROM OfertaAcademicaEntity AS OA WHERE OA.unidad_academica.id= :id_unidad")
    Integer checkUnidadDependersOfertaAcademica(Long id_unidad);

    @Query("SELECT COUNT(AE.unidad_academica.id) FROM AreaEscolarEntity AS AE WHERE AE.unidad_academica.id= :id_unidad")
    Integer checkUnidadDependersAreas(Long id_unidad);

    @Query("SELECT COUNT(FA.unidad_academica.id) FROM FolioAsignaturaEntity AS FA WHERE FA.unidad_academica.id= :id_unidad")
    Integer checkUnidadDependersFolioAsignatura(Long id_unidad);

    @Query("SELECT COUNT(FF.unidad_academica.id) FROM FolioFulltimeEntity AS FF WHERE FF.unidad_academica.id= :id_unidad")
    Integer checkUnidadDependersFolioFulltime(Long id_unidad);
}
