package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.projections.entity.ProyeccionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyeccionRepository extends JpaRepository<ProyeccionEntity, Long> {
    @Query("SELECT P FROM ProyeccionEntity as P WHERE P.folio= :folio")
    List<ProyeccionEntity> findAllByFolioIs(List<String> folio);
}
