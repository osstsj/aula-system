package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarreraPorUnidadRepository extends JpaRepository<CarreraPorUnidadEntity, Long> {
}
