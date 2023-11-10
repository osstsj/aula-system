package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocenteRepository extends JpaRepository<DocenteEntity, Long> {
    @Query("SELECT DE FROM DocenteEntity as DE WHERE DE.unidad= :id_unidad")
    List<DocenteEntity> findAllByUnidad(List<UnidadEntity> id_unidad);
}
