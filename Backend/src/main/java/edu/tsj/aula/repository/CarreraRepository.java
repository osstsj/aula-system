package edu.tsj.aula.repository;

import edu.tsj.aula.model.CarreraEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarreraRepository extends JpaRepository<CarreraEntity, Long> {
    Optional<CarreraEntity> findCarreraEntityByByAbreviatura(String abreviatura);
}
