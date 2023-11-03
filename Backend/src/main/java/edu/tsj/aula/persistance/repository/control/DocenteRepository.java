package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocenteRepository extends JpaRepository<DocenteEntity, Long> {
    @Query("SELECT DE FROM DocenteEntity as DE WHERE DE.plantel= :plantel_id")
    List<DocenteEntity> findAllByPlantel(List<PlantelEntity> plantel_id);
}
