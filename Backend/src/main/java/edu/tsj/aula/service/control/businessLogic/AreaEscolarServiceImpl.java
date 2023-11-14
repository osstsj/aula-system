package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarRequestDto;
import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarResponseDto;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadResponseDto;
import edu.tsj.aula.persistance.models.control.entity.AreaEscolarEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.control.mapper.AreaEscolarMapper;
import edu.tsj.aula.persistance.models.control.mapper.UnidadMapper;
import edu.tsj.aula.persistance.repository.control.AreaRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.IAreaEscolarService;
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
public class AreaEscolarServiceImpl implements IAreaEscolarService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AreaEscolarServiceImpl.class);
    private final AreaRepository areaRepository;
    private final UnidadRepository unidadRepository;
    private final AreaEscolarMapper mapper;

    @Transactional
    @Override
    public AreaEscolarResponseDto createAreaEscolar(AreaEscolarRequestDto areaEscolarRequestDto, Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo createAreaEscolar");
        try {
            UnidadEntity getUnidadById = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontrol unidad con el id {}".concat(id_unidad.toString()),
                    HttpStatus.NOT_FOUND));


            areaEscolarRequestDto.setUnidad_academica(getUnidadById);

            AreaEscolarEntity areaEscolarEntity = mapper.requestToEntity(areaEscolarRequestDto);
            areaRepository.save(areaEscolarEntity);
            var result = mapper.entityToResponse(areaEscolarEntity);
            LOGGER.debug("Se ha guardado el area escolar: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear el area escolar: {}", areaEscolarRequestDto);
            throw  new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<AreaEscolarResponseDto> getAllAreasEscolares() {
        LOGGER.info("Se ha ejecutado el metodo getAllAreasEscolares");
        try {
            var list = areaRepository.findAll();

            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.error("Error al intentar traer lista de areas escolares");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public AreaEscolarResponseDto getAreaEscolarById(Long id) {
        LOGGER.info("Se ha ejuectado el metodo getAreaEscolarById");
        return areaRepository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se econtrado el area ascolar con el id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public AreaEscolarResponseDto updateAreaEscolar(Long id, AreaEscolarRequestDto areaEscolarRequestDto, Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo updateAreaEscolarById");
        try {
            Optional<AreaEscolarEntity> existingAreaEscolarEntity = areaRepository.findById(id);
            if (existingAreaEscolarEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se encontro un area ascolar para actualizar... con el id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND);
            }

            UnidadEntity getUnidadById = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se encontrol unidad con el id {}".concat(id_unidad.toString()),
                            HttpStatus.NOT_FOUND));
            areaEscolarRequestDto.setUnidad_academica(getUnidadById);

            existingAreaEscolarEntity.get().setArea(areaEscolarRequestDto.getArea());
            existingAreaEscolarEntity.get().setResponsable(areaEscolarRequestDto.getResponsable());
            existingAreaEscolarEntity.get().setUnidad_academica(areaEscolarRequestDto.getUnidad_academica());
            existingAreaEscolarEntity.get().setUnidad_academica(areaEscolarRequestDto.getUnidad_academica());

            existingAreaEscolarEntity.get().setFecha_actualizacion(LocalDateTime.now());

            areaRepository.save(existingAreaEscolarEntity.get());
            var result = mapper.entityToResponse(existingAreaEscolarEntity.get());
            LOGGER.debug("Se ha actualizado el area escolar: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear area ascolar: {}", areaEscolarRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteAreaEscolarById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo deleteAreaEscolarById");
        try {
            Optional<AreaEscolarEntity> existingAreaEscolar = areaRepository.findById(id);
            if (existingAreaEscolar.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                areaRepository.deleteById(id);
                response.put("message", String.format("El area ascolar con el id: %s, ha sido elimina exitosamente!", id.toString()));

                LOGGER.debug("Se ha eliminado el area escolar con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al intentar eliminar el area ascolar con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

}
