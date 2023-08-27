package edu.tsj.aula.service.implementation;

import edu.tsj.aula.exception.ResourceNotFoundException;
import edu.tsj.aula.model.CarreraEntity;
import edu.tsj.aula.repository.CarreraRepository;
import edu.tsj.aula.service.ICarrerasService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class CarreraService implements ICarrerasService {
    private final CarreraRepository carreraRepository;

    @Transactional
    @Override
    public CarreraEntity saveCarrera(CarreraEntity carreraEntity) {
        Optional<CarreraEntity> checkCarreraByAbreviatura = carreraRepository.findCarreraEntityByAbreviatura(carreraEntity.getAbreviatura());
        if (checkCarreraByAbreviatura.isPresent())
            log.error(String.format("La carrera ya se encuentra registrada con el id: %s y nombre: %s", carreraEntity.getId(),carreraEntity.getNombre()));

        return carreraRepository.save(carreraEntity);
    }

    @Transactional
    @Override
    public List<CarreraEntity> getAllCarreras() {
        log.debug("Se ha ejecutado el metodo getAllCarreras");
        return carreraRepository.findAll();
    }

    @Transactional
    @Override
    public Optional<CarreraEntity> getCarreraById(Long id) {
        Optional<CarreraEntity> carrera = carreraRepository.findById(id);
        if(carrera.isEmpty())
            throw new ResourceNotFoundException(String.format("No se encontro carrera con el id: %s", id), HttpStatus.NOT_FOUND);

        return carrera;
    }

    @Transactional
    @Override
    public CarreraEntity updateCarrera(CarreraEntity carreraEntity) {
        log.debug("Se ha ejecutado el metodo updateCarrera");
        return carreraRepository.save(carreraEntity);
    }

    @Transactional
    @Override
    public void deleteCarreraById(Long id) {
        log.debug(String.format("Carrera con el id %s ha sido eliminada!", id));
        carreraRepository.deleteById(id);
    }
}
