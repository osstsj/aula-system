package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FulltimeRepository extends JpaRepository<FullTimeEntity, Long> {
    @Query("SELECT FT FROM FullTimeEntity AS FT WHERE FT.folio= :id_folio")
    List<FullTimeEntity> findAllByFolio(FolioFulltimeEntity id_folio);
}
