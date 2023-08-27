package edu.tsj.aula.repository;

import edu.tsj.aula.model.PlantelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantelRepository extends JpaRepository<PlantelEntity, Long> {
    Optional<PlantelEntity> findByNombreCompleto(String nombreCompleto);
}
