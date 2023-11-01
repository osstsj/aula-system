package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarreraRepository extends JpaRepository<CarreraEntity, Long> {
//    @Query("SELECT CE.abreviatura, CE.nombre, CE.dgp, CE.plan_estudio, CE.estatus, CE.fecha_creacion, CE.fecha_actualizacion " +
//            "FROM CarreraEntity as CE where CE.plan_estudio = :plan_estudio")
//    Optional<List<CarreraEntity>> findCarreraEntityByPlan_estudio(@Param("plan_estudio") String plan_estudio);
}
