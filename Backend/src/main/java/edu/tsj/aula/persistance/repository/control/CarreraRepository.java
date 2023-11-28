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
    @Query("SELECT CA FROM CarreraEntity as CA WHERE CA.estatus = 'Activa'")
    List<CarreraEntity> findAllCarrerasByEstatus();

    @Query("SELECT COUNT(O.carrera.id) FROM OfertaAcademicaEntity AS O WHERE O.carrera.id= :id_carrera")
    Integer checkCarreraDependersOfertaAcademica(Long id_carrera);

    @Query("SELECT COUNT(CU.carrera_nombre.id) FROM CarreraPorUnidadEntity AS CU WHERE CU.carrera_nombre.id= :id_carrera")
    Integer checkCarreraDependersCarreraPorUnidad(Long id_carrera);

}
