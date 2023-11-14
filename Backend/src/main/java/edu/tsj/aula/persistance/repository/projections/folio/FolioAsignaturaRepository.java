package edu.tsj.aula.persistance.repository.projections.folio;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolioAsignaturaRepository extends JpaRepository<FolioAsignaturaEntity, Long> {
    @Query("SELECT FA FROM FolioAsignaturaEntity AS FA WHERE FA.unidad_academica= :id_unidad")
    List<FolioAsignaturaEntity> findAllByUnidad_academica(UnidadEntity id_unidad);

}
