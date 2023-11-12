package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadResponseDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.control.mapper.CarreraPorUnidadMapper;
import edu.tsj.aula.persistance.repository.control.CarreraPorUnidadRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.ICarreraPorUnidadService;
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
public class CarreraPorUnidadServiceImpl implements ICarreraPorUnidadService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CarreraPorUnidadServiceImpl.class);
    private final CarreraPorUnidadRepository carreraPorUnidadRepository;
    private final UnidadRepository unidadRepository;
    private final CarreraPorUnidadMapper mapper;

    @Transactional
    @Override
    public CarreraPorUnidadResponseDto createCarreraPorUnidad(CarreraPorUnidadRequestDto carreraPorUnidadRequestDto, Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo createCarreraPorUnidad");
        try {
            UnidadEntity unidadById = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro unidad con el id: " + id_unidad, HttpStatus.NOT_FOUND));

            carreraPorUnidadRequestDto.setUnidad_academica(unidadById);
            CarreraPorUnidadEntity carreraPorUnidadEntity = mapper.requestToEntity(carreraPorUnidadRequestDto);
            carreraPorUnidadRepository.save(carreraPorUnidadEntity);
            var result = mapper.entityToResponse(carreraPorUnidadEntity);
            LOGGER.debug("Se ha creado la carrera por unidad: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear la carrera por unidad: {}", carreraPorUnidadRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public List<CarreraPorUnidadResponseDto> getAllCarrerasPorUnidad() {
        LOGGER.info("Se ha ejecutado el metodo getAllCarrerasPorUnidad");
        try {
            var list = carreraPorUnidadRepository.findAll();

            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.debug("Error al intentar traer lista de carreras por unidad");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public CarreraPorUnidadResponseDto getCarreraPorUnidadById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo getCarreraPorUnidadById");
        return carreraPorUnidadRepository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se ha encontrado carrera por unidad con el id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public CarreraPorUnidadResponseDto updateCarreraPorUnidadById(Long id, CarreraPorUnidadRequestDto carreraPorUnidadRequestDto, Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo updateCarreraPorUnidadById");
        try {
            Optional<CarreraPorUnidadEntity> existingCarreraPorUnidadEntity = carreraPorUnidadRepository.findById(id);
            if (existingCarreraPorUnidadEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se ha encontrado la carrera por unidad para actualizar... con el id{}".concat(id.toString()),
                        HttpStatus.NOT_FOUND);
            }

            UnidadEntity unidadById = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro unidad con el id: " + id_unidad, HttpStatus.NOT_FOUND));

            carreraPorUnidadRequestDto.setUnidad_academica(unidadById);

            existingCarreraPorUnidadEntity.get().setCarrera_nombre(carreraPorUnidadRequestDto.getCarrera_nombre());
            existingCarreraPorUnidadEntity.get().setNivel(carreraPorUnidadRequestDto.getNivel());
            existingCarreraPorUnidadEntity.get().setUnidad_academica(carreraPorUnidadRequestDto.getUnidad_academica());
            existingCarreraPorUnidadEntity.get().setModalidad(carreraPorUnidadRequestDto.getModalidad());
            existingCarreraPorUnidadEntity.get().setFecha_actualizacion(LocalDateTime.now());

            carreraPorUnidadRepository.save(existingCarreraPorUnidadEntity.get());
            var result = mapper.entityToResponse(existingCarreraPorUnidadEntity.get());
            LOGGER.debug("Se ha actualizado la carrera por unidad: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar la carrera por unidad: {}", carreraPorUnidadRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteCarreraPorUnidadById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo deleteCarreraPorUnidadById");
        try {
            Optional<CarreraPorUnidadEntity> existingCarreraPorUnidad = carreraPorUnidadRepository.findById(id);
            if (existingCarreraPorUnidad.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                carreraPorUnidadRepository.deleteById(id);
                response.put("message", String.format("La carrera por unidad con el id: %s a sido eliminada existosamente!", id.toString()));

                LOGGER.debug("Se ha eliminado la carrera por unidad con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al intentar eliminar el carrera por unidad con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }
}
