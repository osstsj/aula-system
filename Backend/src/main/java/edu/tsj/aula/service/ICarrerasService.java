package edu.tsj.aula.service;

import edu.tsj.aula.model.CarreraEntity;

import java.util.List;
import java.util.Optional;

public interface ICarrerasService {
    CarreraEntity saveCarrera(CarreraEntity carreraEntity);

    List<CarreraEntity> getAllCarreras();

    Optional<CarreraEntity> getCarreraById(Long id);

    CarreraEntity updateCarrera(CarreraEntity carreraEntity);

    void deleteCarreraById(Long id);
}
