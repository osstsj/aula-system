package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaResposeDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import edu.tsj.aula.persistance.models.control.entity.OfertaAcademicaEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.control.mapper.OfertaAcademicaMapper;
import edu.tsj.aula.persistance.repository.control.CarreraRepository;
import edu.tsj.aula.persistance.repository.control.OfertaAcademicaRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.IOfertaAcademicaService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OfertaAcademicaServiceImpl implements IOfertaAcademicaService {
    private final OfertaAcademicaRepository ofertaAcademicaRepository;
    private final UnidadRepository unidadRepository;
    private final CarreraRepository carreraRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(OfertaAcademicaServiceImpl.class);
    private final OfertaAcademicaMapper mapper;

    @Transactional
    @Override
    public OfertaAcademicaResposeDto createOfertaAcademica(OfertaAcademicaRequestDto ofertaAcademicaRequestDto, Long id_unidad, Long id_carrera) {
        LOGGER.info("Se ha ejecutado el metodo createOfertaAcademica");
        try {
            UnidadEntity unidadById = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro unidad con el id {}".concat(id_unidad.toString()),
                            HttpStatus.NOT_FOUND));

            CarreraEntity carreraById = carreraRepository.findById(id_carrera).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro la carrera con el id {}".concat(id_carrera.toString()),
                            HttpStatus.NOT_FOUND));

            ofertaAcademicaRequestDto.setUnidad_academica(unidadById);
            ofertaAcademicaRequestDto.setCarrera(carreraById);

            OfertaAcademicaEntity ofertaAcademicaEntity = mapper.requestToEntity(ofertaAcademicaRequestDto);
            ofertaAcademicaRepository.save(ofertaAcademicaEntity);
            var result = mapper.entityToResponse(ofertaAcademicaEntity);
            LOGGER.debug("Se ha creado la ofeta academica: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear la oferta academica: {}", ofertaAcademicaRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<OfertaAcademicaResposeDto> getAllOfertasAcademicas() {
        LOGGER.info("Se ha ejecutado el metodo getAllOfertasAcademicas");
        try {
            var list = ofertaAcademicaRepository.findAll();

            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.error("Error al intentar traer lista de ofertas academicas");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public OfertaAcademicaResposeDto getOfertaAcademicaById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo getOfertaAcademicaById");
        return ofertaAcademicaRepository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se ha encontrado la oferta academica con el id: "
                        .concat(id.toString()), HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public OfertaAcademicaResposeDto updateOfertaAcademicaById(Long id, OfertaAcademicaRequestDto ofertaAcademicaRequestDto, Long id_unidad, Long id_carrera) {
        LOGGER.info("Se ha ejecutado el metodo updateOfertaAcademicaById");
        try {
            Optional<OfertaAcademicaEntity> existingOfertaAcademicaEntity = ofertaAcademicaRepository.findById(id);
            if (existingOfertaAcademicaEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se ha encontrado la oferta academica para actualizar... con el id: {}"
                        .concat(id.toString()), HttpStatus.NOT_FOUND);
            }
            UnidadEntity unidadById = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontrol unidad con el id {}".concat(id_unidad.toString()),
                            HttpStatus.NOT_FOUND));

            CarreraEntity carreraById = carreraRepository.findById(id_carrera).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontro la carrera con el id {}".concat(id_carrera.toString()),
                            HttpStatus.NOT_FOUND));

            ofertaAcademicaRequestDto.setUnidad_academica(unidadById);
            ofertaAcademicaRequestDto.setCarrera(carreraById);

            existingOfertaAcademicaEntity.get().setUnidad_academica(ofertaAcademicaRequestDto.getUnidad_academica());
            existingOfertaAcademicaEntity.get().setCarrera(ofertaAcademicaRequestDto.getCarrera());
            existingOfertaAcademicaEntity.get().setModalidad(ofertaAcademicaRequestDto.getModalidad());
            existingOfertaAcademicaEntity.get().setTurno(ofertaAcademicaRequestDto.getTurno());
            existingOfertaAcademicaEntity.get().setPeriodo(ofertaAcademicaRequestDto.getPeriodo());

            existingOfertaAcademicaEntity.get().setFecha_actualizacion(LocalDateTime.now());

            ofertaAcademicaRepository.save(existingOfertaAcademicaEntity.get());
            var result = mapper.entityToResponse(existingOfertaAcademicaEntity.get());
            LOGGER.debug("Se ha actualizado la oferta academica: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar actualizar la oferta academica: {}", ofertaAcademicaRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteOfertaAcademicaById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo deleteOfertaAcademicaById");
        try {
            Optional<OfertaAcademicaEntity> existingOfertaAcademicaEntity = ofertaAcademicaRepository.findById(id);
            if (existingOfertaAcademicaEntity.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                ofertaAcademicaRepository.deleteById(id);
                response.put("message", String.format("La oferta academica con el id: %s a sido eliminada existosamente!",
                        id.toString()));

                LOGGER.debug("Se ha eliminado la oferta academica con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al intentar eliminar la oferta academica con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }
}
