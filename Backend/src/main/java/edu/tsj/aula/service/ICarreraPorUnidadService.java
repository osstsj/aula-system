package edu.tsj.aula.service;

import edu.tsj.aula.model.CarreraPorUnidadEntity;

import java.util.List;
import java.util.Optional;

public interface ICarreraPorUnidadService {
    CarreraPorUnidadEntity saveCarreraPorUnidad(CarreraPorUnidadEntity carreraPorUnidadEntity);

    List<CarreraPorUnidadEntity> getAllCarreraPorUnidad();

    Optional<CarreraPorUnidadEntity> getCarreraPorUnidadById(Long id);

    CarreraPorUnidadEntity updateCarreraPorUnidad(CarreraPorUnidadEntity carreraPorUnidadEntity);

    void deleteCarreraPorUnidadById(Long id);
}
