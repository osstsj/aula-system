package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaResponseDto;
import edu.tsj.aula.persistance.models.control.entity.ColegiaturaEntity;
import edu.tsj.aula.persistance.models.control.mapper.ColegiaturaMapper;
import edu.tsj.aula.persistance.repository.control.ColegiaturaRepository;
import edu.tsj.aula.service.control.IColegiaturaService;
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
public class ColegiaturaServiceImpl implements IColegiaturaService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ColegiaturaServiceImpl.class);
    private final ColegiaturaRepository colegiaturaRepository;
    private final ColegiaturaMapper mapper;

    @Transactional
    @Override
    public ColegiaturaResponseDto createColegiatura(ColegiaturaRequestDto colegiaturaRequestDto) {
        LOGGER.info("Se ha ejecutado el metodo createColegiatura");
        try {
            ColegiaturaEntity colegiaturaEntity = mapper.requestToEntity(colegiaturaRequestDto);
            colegiaturaRepository.save(colegiaturaEntity);
            var result = mapper.entityToResponse(colegiaturaEntity);
            LOGGER.debug("Se ha creado la colegiatura: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear la colegiatura: {}", colegiaturaRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public List<ColegiaturaResponseDto> getAllColegiaturas() {
        LOGGER.info("Se ha ejecutado el metodo getAllColegiaturas");
        try {
            var list = colegiaturaRepository.findAll();

            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.error("Error al intentar traer lista de colegiaturas");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public ColegiaturaResponseDto getColegiaturaById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo getColegiaturaById");
        return colegiaturaRepository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se ha encontrado colegiatura con el id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public ColegiaturaResponseDto updateColegiaturaById(Long id, ColegiaturaRequestDto colegiaturaRequestDto) {
        LOGGER.info("Se ha ejecutado el metodo updateColegiaturaById");
        try {
            Optional<ColegiaturaEntity> existingColegiaturaEntity = colegiaturaRepository.findById(id);
            if (existingColegiaturaEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se ha encontrado la colegiatura para actualizar... con el id: {}".concat(id.toString()),
                        HttpStatus.NOT_FOUND);
            }

            existingColegiaturaEntity.get().setClave(colegiaturaRequestDto.getClave());
            existingColegiaturaEntity.get().setDescripcion(colegiaturaRequestDto.getDescripcion());
            existingColegiaturaEntity.get().setMonto(colegiaturaRequestDto.getMonto());
            existingColegiaturaEntity.get().setColegiatura_estatus(colegiaturaRequestDto.getColegiatura_estatus());
            existingColegiaturaEntity.get().setComentarios(colegiaturaRequestDto.getComentarios());
            existingColegiaturaEntity.get().setFecha_actualizacion(LocalDateTime.now());

            colegiaturaRepository.save(existingColegiaturaEntity.get());
            var result = mapper.entityToResponse(existingColegiaturaEntity.get());
            LOGGER.debug("Se ha actualizado la colegiatura: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar la colegiatura: {}", colegiaturaRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteColegiaturaById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo deleteColegiaturaById");
        try {
            Optional<ColegiaturaEntity> existingColegiaturaEntity = colegiaturaRepository.findById(id);
            if (existingColegiaturaEntity.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                colegiaturaRepository.deleteById(id);
                response.put("message", String.format("La colegiatura con el id: %s a sido eliminada existosamente!", id.toString()));

                LOGGER.debug("Se ha eliminado la colegiatura con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al intentar eliminar la colegiatura con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }
}
