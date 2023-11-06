package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.projections.entity.FolioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyeccionRepository extends JpaRepository<FolioEntity, Long> {
    @Query("SELECT P FROM FolioEntity as P WHERE P.folio= :folio")
    List<FolioEntity> findAllByFolioIs(List<String> folio);
}
