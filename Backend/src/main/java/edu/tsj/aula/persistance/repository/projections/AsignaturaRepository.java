package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsignaturaRepository  extends JpaRepository<AsignaturaEntity, Long> {
    @Query("SELECT AE FROM AsignaturaEntity as AE WHERE AE.unidad_academica= :unidad_academica AND AE.folio= :folio")
    List<AsignaturaEntity> findAllByUnidad_academicaAndFolio(FolioAsignaturaEntity folio, UnidadEntity unidad_academica);

    @Query("SELECT AE FROM AsignaturaEntity as AE WHERE AE.folio= :folio")
    List<AsignaturaEntity> findAllByFolio(FolioAsignaturaEntity folio);
}
