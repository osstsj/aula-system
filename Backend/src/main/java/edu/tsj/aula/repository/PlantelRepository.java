package edu.tsj.aula.repository;

import edu.tsj.aula.model.Plantel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantelRepository extends JpaRepository<Plantel, Long> {
    Optional<Plantel> findByNombreCompleto(String nombreCompleto);
}
