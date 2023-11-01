package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.OfertaAcademicaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfertaAcademicaRepository extends JpaRepository<OfertaAcademicaEntity, Long> {

}
