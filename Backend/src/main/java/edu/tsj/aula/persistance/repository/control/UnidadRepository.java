package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadRepository extends JpaRepository<UnidadEntity, Long> {
    @Query("SELECT COUNT(DE.unidad_academica) FROM DocenteEntity AS DE WHERE EXISTS " +
            "(SELECT U.id FROM UnidadEntity as U WHERE U.id = DE.unidad_academica.id)"
    )
    Integer checkUnidadDependersDocente();

    @Query("SELECT COUNT(CU.unidad_academica) FROM CarreraPorUnidadEntity AS CU WHERE EXISTS " +
            "(SELECT U.id FROM UnidadEntity as U WHERE U.id = CU.unidad_academica.id)"
    )
    Integer checkUnidadDependersCarreraPorUnidad();

    @Query("SELECT COUNT(OA.unidad_academica) FROM OfertaAcademicaEntity AS OA WHERE EXISTS " +
            "(SELECT U.id FROM UnidadEntity as U WHERE U.id = OA.unidad_academica.id)"
    )
    Integer checkUnidadDependersOfertaAcademica();

    @Query("SELECT COUNT(AE.unidad_academica) FROM AreaEscolarEntity AS AE WHERE EXISTS " +
            "(SELECT U.id FROM UnidadEntity as U WHERE U.id = AE.unidad_academica.id)"
    )
    Integer checkUnidadDependersAreas();

    @Query("SELECT COUNT(FA.unidad_academica) FROM FolioAsignaturaEntity AS FA WHERE EXISTS " +
            "(SELECT U.id FROM UnidadEntity as U WHERE U.id = FA.unidad_academica.id)"
    )
    Integer checkUnidadDependersFolioAsignatura();

    @Query("SELECT COUNT(FF.unidad_academica) FROM FolioFulltimeEntity AS FF WHERE EXISTS " +
            "(SELECT U.id FROM UnidadEntity as U WHERE U.id = FF.unidad_academica.id)"
    )
    Integer checkUnidadDependersFolioFulltime();
}
