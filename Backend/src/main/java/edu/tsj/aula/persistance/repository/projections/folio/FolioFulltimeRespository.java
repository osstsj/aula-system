package edu.tsj.aula.persistance.repository.projections.folio;

import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolioFulltimeRespository extends JpaRepository<FolioFulltimeEntity, Long> {
}
