package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.PlantelEntity;
import edu.tsj.aula.persistance.models.control.mapper.PlantelMapper;
import edu.tsj.aula.persistance.repository.control.ExtensionRepository;
import edu.tsj.aula.persistance.repository.control.PlantelRepository;
import edu.tsj.aula.service.control.IPlantelService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PlantelServiceImpl implements IPlantelService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlantelServiceImpl.class);
    private final PlantelRepository plantelRepository;
    private final ExtensionRepository extensionRepository;
    private final PlantelMapper mapper;

    @Override
    public PlantelEntity createPlantel(PlantelEntity plantelRequestDto) {
        return plantelRepository.save(plantelRequestDto);
    }

    @Override
    public List<PlantelEntity> getAllPlanteles() {
        return plantelRepository.findAll();
    }

    @Override
    public Optional<PlantelEntity> getPlantelById(Long id) {
        return plantelRepository.findById(id);
    }

    @Override
    public PlantelEntity updatePlantelById(Long id, PlantelEntity plantelUpdateRequestDto) {
        LOGGER.info("Se ha ejecutado el metodo updatePlantelById");
        try {
            Optional<PlantelEntity> exisitingPlantelEntity = plantelRepository.findById(id);
            if (exisitingPlantelEntity.isEmpty()) {
                throw new ResourceNotFoundException("No se ha encontrado el plantel para actualizar... con el id: {}"
                        .concat(id.toString()), HttpStatus.NOT_FOUND);
            }

            exisitingPlantelEntity.get().setTipo_unidad(plantelUpdateRequestDto.getTipo_unidad());
            exisitingPlantelEntity.get().setClave_dgp(plantelUpdateRequestDto.getClave_dgp());
            exisitingPlantelEntity.get().setAbreviatura(plantelUpdateRequestDto.getAbreviatura());
            exisitingPlantelEntity.get().setNombre_corto(plantelUpdateRequestDto.getNombre_corto());
            exisitingPlantelEntity.get().setNombre_completo(plantelUpdateRequestDto.getNombre_completo());
            exisitingPlantelEntity.get().setDireccion_completa(plantelUpdateRequestDto.getDireccion_completa());
            exisitingPlantelEntity.get().setFecha_actualizacion(LocalDateTime.now());

            return plantelRepository.save(exisitingPlantelEntity.get());


//          return  plantelRepository.save(exisitingPlantelEntity.get());
//            var result = mapper.entityToResponse(exisitingPlantelEntity.get());
//            LOGGER.debug("Se ha actualizado el plantel: {}", result.toString());

//            return result;
        } catch (Exception e) {
            LOGGER.error("Error al actualizar el plantel con el id: {}", id);
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }


    @Override
    public HashMap<String, String> deletePlantelById(Long id) {
        return null;
    }

//    @Transactional
//    @Override
//    public PlantelResponseDto createPlantel(PlantelRequestDto plantelRequestDto) {
//        LOGGER.info("Se ha ejecutado el metodo createPlantel");
//        try {
//            PlantelEntity plantelEntity = mapper.requestToEntity(plantelRequestDto);
//            plantelRepository.save(plantelEntity);
//            var result = mapper.entityToResponse(plantelEntity);
//            LOGGER.debug("Se ha creado el plantel: {}", result.toString());
//
//            return result;
//        } catch (Exception e) {
//            LOGGER.error("Error al intentar crear plantel: {}", plantelRequestDto.toString());
//            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
//        }
//    }
//
//    @Transactional
//    @Override
//    public List<PlantelResponseDto> getAllPlanteles() {
//        LOGGER.info("Se ha ejecutado el metodo getAllPlanteles");
//        try {
//            var list = plantelRepository.findAll();
//
//            return list.stream().map(mapper::entityToResponse).collect(Collectors.toList());
//        } catch (Exception e) {
//            LOGGER.error("Error al intentar traer lista de planteles");
//            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
//        }
//    }
//
//    @Transactional
//    @Override
//    public PlantelResponseDto getPlantelById(Long id) {
//        LOGGER.info("Se ha ejecutado el metodo getPlantelById");
//        return plantelRepository.findById(id)
//                .map(mapper::entityToResponse)
//                .orElseThrow(() -> new ResourceNotFoundException("No se encontro plantel con id: ".concat(id.toString()),
//                        HttpStatus.NOT_FOUND));
//    }
//
//    @Transactional
//    @Override
//    public PlantelResponseDto updatePlantelById(Long id, PlantelRequestDto plantelRequestDto) {
//        LOGGER.info("Se ha ejecutado el metodo updatePlantelById");
//        try {
//            Optional<PlantelEntity> exisitingPlantelEntity = plantelRepository.findById(id);
//            if (exisitingPlantelEntity.isEmpty()) {
//                throw new ResourceNotFoundException("No se ha encontrado el plantel para actualizar... con el id: {}"
//                        .concat(id.toString()), HttpStatus.NOT_FOUND);
//            }
//
//            exisitingPlantelEntity.get().setTipo_unidad(plantelRequestDto.getTipo_unidad());
//            exisitingPlantelEntity.get().setClave_dgp(plantelRequestDto.getClave_dgp());
//            exisitingPlantelEntity.get().setAbreviatura(plantelRequestDto.getAbreviatura());
//            exisitingPlantelEntity.get().setNombre_corto(plantelRequestDto.getNombre_corto());
//            exisitingPlantelEntity.get().setNombre_completo(plantelRequestDto.getNombre_completo());
//            exisitingPlantelEntity.get().setDireccion_completa(plantelRequestDto.getDireccion_completa());
//            exisitingPlantelEntity.get().setFecha_actualizacion(LocalDateTime.now());
//
//            plantelRepository.save(exisitingPlantelEntity.get());
//            var result = mapper.entityToResponse(exisitingPlantelEntity.get());
//            LOGGER.debug("Se ha actualizado el plantel: {}", result.toString());
//
//            return result;
//        } catch (Exception e) {
//            LOGGER.error("Error al actualizar el plantel con el id: {}", id);
//            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
//        }
//    }
//
//    @Transactional
//    @Override
//    public HashMap<String, String> deletePlantelById(Long id) {
//        LOGGER.info("Se a ejecutado el metodo deletePlantelById");
//        try {
//            PlantelEntity existingPlantel = plantelRepository.findById(id).orElse(null);
//            if (existingPlantel != null) {
//                HashMap<String, String> response = new HashMap<>();
//                response.put("message", String.format("El plantel con el id %s ha sido elimido exitosamente!", id.toString()));
//                plantelRepository.deleteById(id);
//
//                LOGGER.debug("Se ha eliminado el plantel con el id: {}", id.toString());
//                return response;
//            }
//            return null;
//        } catch (Exception e) {
//            LOGGER.error("Error al eliminar el plantel con el id: {}", id);
//            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
//        }
//    }


}
