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
    @Query("SELECT AE FROM AsignaturaEntity as AE WHERE AE.folio= :id_folio")
    List<AsignaturaEntity> findAllByFolio(FolioAsignaturaEntity id_folio);
}
