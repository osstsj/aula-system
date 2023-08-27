package edu.tsj.aula.service.implementation;

import edu.tsj.aula.model.CarreraEntity;
import edu.tsj.aula.service.ICarrerasService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class CarreraService implements ICarrerasService {

    @Override
    public CarreraEntity saveCarrera(CarreraEntity carreraEntity) {
        return null;
    }

    @Override
    public Optional<CarreraEntity> getCarreraById(Long id) {
        return Optional.empty();
    }

    @Override
    public CarreraEntity updateCarrera(CarreraEntity carreraEntity) {
        return null;
    }

    @Override
    public void deleteCarreraById(Long id) {

    }
}
