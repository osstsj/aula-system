package edu.tsj.aula.persistance.repository.projections.folio;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolioFulltimeRespository extends JpaRepository<FolioFulltimeEntity, Long> {
    @Query("SELECT FF FROM FolioFulltimeEntity AS FF WHERE FF.unidad_academica= :id_unidad")
    List<FolioFulltimeEntity> findAllByUnidad_academica(UnidadEntity id_unidad);
}
