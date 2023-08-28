package edu.tsj.aula.service.implementation;

import edu.tsj.aula.model.CarreraPorUnidadEntity;
import edu.tsj.aula.repository.CarreraPorUnidadRepository;
import edu.tsj.aula.service.ICarreraPorUnidadService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class CarreraPorUnidadServiceImpl implements ICarreraPorUnidadService {
    private final CarreraPorUnidadRepository carreraPorUnidadRepository;

    @Transactional
    @Override
    public CarreraPorUnidadEntity saveCarreraPorUnidad(CarreraPorUnidadEntity carreraPorUnidadEntity) {
        log.debug("Se ha registrado la carreraPorUnidad con el id: " + carreraPorUnidadEntity.getId());
        return carreraPorUnidadRepository.save(carreraPorUnidadEntity);
    }


    @Transactional
    @Override
    public List<CarreraPorUnidadEntity> getAllCarreraPorUnidad() {
        log.debug("Se ha ejecuta el metodo getAllCarreraPorUnidad");
        return carreraPorUnidadRepository.findAll();
    }

    @Transactional
    @Override
    public Optional<CarreraPorUnidadEntity> getCarreraPorUnidadById(Long id) {
        log.debug("Se ha ejecutado el metodo getCarreraPorUnidadById");
        return carreraPorUnidadRepository.findById(id);
    }

    @Transactional
    @Override
    public CarreraPorUnidadEntity updateCarreraPorUnidad(CarreraPorUnidadEntity carreraPorUnidadEntity) {
        return carreraPorUnidadRepository.save(carreraPorUnidadEntity);
    }

    @Transactional
    @Override
    public void deleteCarreraPorUnidadById(Long id) {
        log.debug("Se ha elimindo la carreraPorUnidad con el id: " + id);
        carreraPorUnidadRepository.deleteById(id);
    }
}
