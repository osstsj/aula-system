package edu.tsj.aula.service.implementation;

import edu.tsj.aula.model.CarreraEntity;
import edu.tsj.aula.repository.CarreraRepository;
import edu.tsj.aula.service.ICarrerasService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class CarreraService implements ICarrerasService {
    private final CarreraRepository carreraRepository;

    @Transactional
    @Override
    public CarreraEntity saveCarrera(CarreraEntity carreraEntity) {
        Optional<CarreraEntity> checkCarreraByAbreviatura = carreraRepository.findCarreraEntityByByAbreviatura(carreraEntity.getAbreviatura());
        if (checkCarreraByAbreviatura.isPresent())
            log.error(String.format("La carrera ya se encuentra registrada con el id: %s y nombre: %s", carreraEntity.getId(),carreraEntity.getNombre()));
        return carreraRepository.save(carreraEntity);
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
