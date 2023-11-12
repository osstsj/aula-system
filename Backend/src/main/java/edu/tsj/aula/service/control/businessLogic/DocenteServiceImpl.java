package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteRequestDto;
import edu.tsj.aula.persistance.models.control.dto.docenteDto.DocenteResponseDto;
import edu.tsj.aula.persistance.models.control.entity.DocenteEntity;
import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.control.mapper.DocenteMapper;
import edu.tsj.aula.persistance.repository.control.DocenteRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.IDocenteService;
import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
//@Slf4j
public class DocenteServiceImpl implements IDocenteService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DocenteServiceImpl.class);
    private final DocenteRepository docenteRepository;
    private final DocenteMapper mapper; // no se puede ser static ya que no ha sido inicializada...
    private final UnidadRepository unidadRepository;

    @Transactional
    @Override
    public DocenteResponseDto createDocente(DocenteRequestDto docenteRequestDto, Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo createDocente");
        try {
            UnidadEntity unidadEntity = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se ha encontrado la unidad con el id: "
                            .concat(id_unidad.toString()), HttpStatus.NOT_FOUND)
            );

            docenteRequestDto.setUnidad_academica(unidadEntity);

            String nombre_completo_aux = docenteRequestDto.getNombre().concat(" ")
                    .concat(docenteRequestDto.getApellido_paterno()).concat(" ")
                    .concat(docenteRequestDto.getApellido_paterno()).concat(" ");

            docenteRequestDto.setNombre_completo(nombre_completo_aux);

            DocenteEntity docenteEntity = mapper.requestToEntity(docenteRequestDto);
            docenteRepository.save(docenteEntity);

            var result = mapper.entityToRespose(docenteEntity);
            LOGGER.debug("Se ha creado el docente: {}", result.toString());

            return result;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear al docente: {}", docenteRequestDto.toString());
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public List<DocenteResponseDto> getAllDocentes() {
        LOGGER.info("Se ha ejecutado el metodo getAllDocentes");
        try {
            var list = docenteRepository.findAll();

            return list.stream().map(mapper::entityToRespose).collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.debug("Error al intetar traer la lista de docentes");
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public List<DocenteResponseDto> findAllDocentesByUnidad(Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo findAllDocentesByUnidad");
        UnidadEntity unidad = unidadRepository.findById(id_unidad).get();
        var list = docenteRepository.findAllByUnidad(Collections.singletonList(unidad));

        return list.stream().map(mapper::entityToRespose).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public DocenteResponseDto getDocenteById(Long id) {
        LOGGER.info("Se ha ejeuctado el metodo getDocenteById");
        return docenteRepository.findById(id)
                .map(mapper::entityToRespose)
                .orElseThrow(() -> new ResourceNotFoundException("No se ha encontrado el docente con el id: "
                        .concat(id.toString()), HttpStatus.NOT_FOUND));
    }


    @Transactional
    @Override
    public DocenteResponseDto updateDocenteById(Long id, Long id_unidad, DocenteRequestDto docenteRequestDto) {
        try {
            Optional<DocenteEntity> existingDocente = docenteRepository.findById(id);
            if (existingDocente.isEmpty()) {
                throw new ResourceNotFoundException("No se ha encontrado un docente para actualizar... con el id: {}"
                        .concat(id.toString()), HttpStatus.NOT_FOUND);
            }

            UnidadEntity unidadEntity = unidadRepository.findById(id_unidad).orElseThrow(
                    () -> new ResourceNotFoundException("No se ha encontrado la unidad con el id: "
                            .concat(id_unidad.toString()), HttpStatus.NOT_FOUND)
            );

            docenteRequestDto.setUnidad_academica(unidadEntity);
            var nombre_completo_aux = docenteRequestDto.getNombre().concat(" ")
                    .concat(docenteRequestDto.getApellido_paterno()).concat(" ")
                    .concat(docenteRequestDto.getApellido_paterno()).concat(" ");


            existingDocente.get().setNombre(docenteRequestDto.getNombre());
            existingDocente.get().setApellido_paterno(docenteRequestDto.getApellido_paterno());
            existingDocente.get().setApellido_materno(docenteRequestDto.getApellido_materno());

            existingDocente.get().setNombre_completo(nombre_completo_aux);

            existingDocente.get().setCategoria(docenteRequestDto.getCategoria());
            existingDocente.get().setActividad(docenteRequestDto.getActividad());
            existingDocente.get().setUnidad_academica(unidadEntity);
            existingDocente.get().setFecha_actualizacion(LocalDateTime.now());


            docenteRepository.save(existingDocente.get());
            var result = mapper.entityToRespose(existingDocente.get());
            LOGGER.debug("Se ha actualizado el docente: {}", result.toString());

            return result;
        } catch (Exception e ) {
            LOGGER.error("Error al intetar actualizar el docente con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }


    @Transactional
    @Override
    public HashMap<String, String> deleteDocenteById(Long id) {
        LOGGER.info("Se ha ejecutado el metodo deleteDocenteById");
        try {
            Optional<DocenteEntity> existingDocenteEntity = docenteRepository.findById(id);
            if (existingDocenteEntity.isPresent()) {
                HashMap<String, String> response = new HashMap<>();
                docenteRepository.deleteById(id);
                response.put("message", String.format("El docente con el id: %s a sido eliminado exitosamente!",
                        id.toString()));

                LOGGER.debug("Se ha eliminado al docente con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al intentar eliminar al docente con el id: ".concat(id.toString()));
            throw new RuntimeException("Runtime Exception: ".concat(e.getMessage()));
        }
    }

}
