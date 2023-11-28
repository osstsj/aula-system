package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.unidadDto.UnidadResponseDto;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.control.mapper.UnidadMapper;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.IUnidadService;
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
public class UnidadServiceImpl implements IUnidadService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UnidadServiceImpl.class);
    private final UnidadRepository unidadRepository;
    private final UnidadMapper mapper;



    @Transactional
    @Override
    public UnidadResponseDto createUnidad(UnidadRequestDto unidadRequestDto) {
        LOGGER.info("Se ha ejecutado el metodo createUnidad");
        try {
            UnidadEntity unidadEntity = mapper.requestToEntity(unidadRequestDto);
            unidadRepository.save(unidadEntity);
            var result = mapper.entityToResponse(unidadEntity);
            LOGGER.debug("Se ha creado la unidad: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear la unidad: {}", unidadRequestDto.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<UnidadResponseDto> getAllUnidades() {
        LOGGER.info("Se ha ejecutado el metodo getAllUnidades");
        try {
            var list = unidadRepository.findAll();

            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.error("Error al intentar traer lista de unidades");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public UnidadResponseDto getUnidadById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo getUnidadById");
        return unidadRepository.findById(id)
                .map(mapper::entityToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontro la unidad con id: ".concat(id.toString()),
                        HttpStatus.NOT_FOUND));
    }

    @Transactional
    @Override
    public UnidadResponseDto updateUnidadById(Long id, UnidadRequestDto unidadRequestDto) {
        LOGGER.info("Se ha ejecutado el metodo updateUnidadById");
        try {
            Optional<UnidadEntity> unidadEntity = unidadRepository.findById(id);
            if (unidadEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se ha encontrado la unidad para actualizar... con el id: {}"
                        .concat(id.toString()), HttpStatus.NOT_FOUND);
            }

            unidadEntity.get().setTipo_unidad( unidadRequestDto.getTipo_unidad());
            unidadEntity.get().setClave_dgp( unidadRequestDto.getClave_dgp());
            unidadEntity.get().setAbreviatura( unidadRequestDto.getAbreviatura());
            unidadEntity.get().setNombre_corto( unidadRequestDto.getNombre_corto());
            unidadEntity.get().setNombre_completo( unidadRequestDto.getNombre_completo());
            unidadEntity.get().setDireccion_completa( unidadRequestDto.getDireccion_completa());
            unidadEntity.get().setFecha_actualizacion(LocalDateTime.now());

            unidadRepository.save(unidadEntity.get());
            var result = mapper.entityToResponse(unidadEntity.get());
            LOGGER.debug("Se ha actualizado la unidad: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al actualizar la unidad con el id: {}", id);
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public HashMap<String, String> deleteUnidadById(Long id) {
        LOGGER.info("Se a ejecutado el metodo deleteUnidadById");
        try {
            UnidadEntity existingPlantel = unidadRepository.findById(id).orElse(null);
            if (existingPlantel != null) {
                HashMap<String, String> response = new HashMap<>();
                response.put("message", String.format("El unidad con el id %s ha sido elimido exitosamente!", id.toString()));
                unidadRepository.deleteById(id);

                LOGGER.debug("Se ha eliminado la unidad con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al eliminar la unidad con el id: {}", id);
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public Boolean checkUnidadDependersByUnidadId(Long id_unidad) {
        return (
                unidadRepository.checkUnidadDependersCarreraPorUnidad(id_unidad) + unidadRepository.checkUnidadDependersOfertaAcademica(id_unidad) +
                        unidadRepository.checkUnidadDependersAreas(id_unidad) + unidadRepository.checkUnidadDependersDocente(id_unidad) +
                        unidadRepository.checkUnidadDependersFolioAsignatura(id_unidad) + unidadRepository.checkUnidadDependersFolioFulltime(id_unidad) +
                        unidadRepository.checkUnidadDependersExtensiones(id_unidad)
        ) > 0; // true - hay unidades presentes en otras tablas
    }

}
