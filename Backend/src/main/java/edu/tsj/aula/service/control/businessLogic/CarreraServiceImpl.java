package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraResponseDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.mapper.CarreraMapper;
import edu.tsj.aula.persistance.repository.control.CarreraRepository;
import edu.tsj.aula.service.control.ICarreraService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CarreraServiceImpl implements ICarreraService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CarreraServiceImpl.class);
    private final CarreraRepository carreraRepository;
    private final CarreraMapper mapper;

//    @Transactional
//    @Override
//    public CarreraResponseDto createCarrera(CarreraRequestDto carreraRequestDto) {
//        LOGGER.info("Se ha ejecutado el metodo createCarrera");
//        try {
//            CarreraEntity carreraEntity = mapper.requestToEntity(carreraRequestDto);
//            carreraRepository.save(carreraEntity);
//            var result = mapper.entityToResponse(carreraEntity);
//            LOGGER.debug("Se ha guardado el Area Escolar: {}", result.toString());
//
//            return result;
//        } catch (Exception e) {
//            LOGGER.error("Error al intentar  crear carrera: {}", carreraRequestDto.toString());
//            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
//        }
//    }

    @Override
    public CarreraEntity createCarrera(CarreraEntity carreraRequestDto) {
        var clave_programa = carreraRequestDto.getAbreviatura().concat("-")
                .concat(carreraRequestDto.getPlan_estudio());
        carreraRequestDto.setClave_programa(clave_programa);

        return carreraRepository.save(carreraRequestDto);
    }

    @Transactional
    @Override
    public List<CarreraResponseDto> getAllCarreras() {
        LOGGER.info("Se ha ejecutado el metodo getAllCarreras");
        try {
            var list = carreraRepository.findAll();

            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.error("Error al intentar  traer lista de carreras");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public CarreraResponseDto getCarreraById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo getCarreraById");
        return carreraRepository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontro carrera con el id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public CarreraResponseDto updateCarreraById(Long id, CarreraRequestDto carreraRequestDto) {
        LOGGER.info("Se ha ejecutado el metodo updateCarrera");
        try {
            Optional<CarreraEntity> existingCarreraEntity = carreraRepository.findById(id);
            if (existingCarreraEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se encontro una carrera para actualizar... con el id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND);
            }

            existingCarreraEntity.get().setAbreviatura(carreraRequestDto.getAbreviatura());
            existingCarreraEntity.get().setNombre(carreraRequestDto.getNombre());
            existingCarreraEntity.get().setDgp(carreraRequestDto.getDgp());
            existingCarreraEntity.get().setPlan_estudio(carreraRequestDto.getPlan_estudio());
            existingCarreraEntity.get().setEstatus(carreraRequestDto.getEstatus());
            existingCarreraEntity.get().setFecha_actualizacion(LocalDateTime.now());

            carreraRepository.save(existingCarreraEntity.get());
            var result = mapper.entityToResponse(existingCarreraEntity.get());
            LOGGER.debug("Se ha actualizado la carrera por unidad: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intetar actualizar la carrera con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteCarreraById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo deleteCarreraById");
        try {
            CarreraEntity exisitingCarrera = carreraRepository.findById(id).orElse(null);
            if (exisitingCarrera != null) {
                HashMap<String, String> response = new HashMap<>();
                carreraRepository.deleteById(id);
                response.put("message", String.format("La carrera con el id: %s, ha sido eliminada exitosamente!", id.toString()));

                LOGGER.debug("Se ha eliminado la carrera con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al eliminar la carrera con el id: {}", id);
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

//    @Transactional
//    @Override
//    public List<CarreraResponseDto> getCarreraByPlanEstudio(String plan_estudio) {
////        var list = carreraRepository.findCarreraEntityByPlan_estudio(plan_estudio)
////                .stream().map(p -> mapper.entityToResponse(p)).collect(Collectors.toList());
////
////            return carreraRepository.findCarreraEntityByPlan_estudio(plan_estudio)
////                    .map(mapper::entityToResponse)
////                    .orElseThrow(() -> new ResourceNotFoundException("No se encontro carrera con el plan de estudios: "
////                            .concat(plan_estudio), HttpStatus.NOT_FOUND));
//    }

}
