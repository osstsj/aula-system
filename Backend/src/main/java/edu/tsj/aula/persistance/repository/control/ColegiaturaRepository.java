package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.ColegiaturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColegiaturaRepository extends JpaRepository<ColegiaturaEntity,Long> {
}
