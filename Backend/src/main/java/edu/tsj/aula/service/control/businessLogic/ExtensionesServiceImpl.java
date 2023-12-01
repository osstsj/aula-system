package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;
import edu.tsj.aula.persistance.repository.control.ExtensionRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.IExtensionService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@Service
public class ExtensionesServiceImpl implements IExtensionService {
    private final UnidadRepository unidadRepository;
    private final ExtensionRepository extensionRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(ExtensionesServiceImpl.class);

    @Transactional
    @Override
    public ExtensionEntity createExtensionByUnidadId(Long id_unidad, ExtensionEntity extensionEntity) {
        LOGGER.info("Se ha ejecutado el metodo createExtensionByUnidadId");
        try {
            unidadRepository.findById(id_unidad).map(unidadEntity -> {
                extensionEntity.setUnidad(unidadEntity);
                return extensionRepository.save(extensionEntity);
            })
            .orElseThrow(() -> new ResourceNotFoundException("No se encontro la unidad con id: ".concat(id_unidad.toString()),
                    HttpStatus.NOT_FOUND));

            return extensionEntity;
        } catch (Exception e) {
            LOGGER.error("Error al intentar crear la extension: {}", extensionEntity.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Transactional
    @Override
    public ExtensionEntity updateExtensionById(Long id_extension, ExtensionEntity extensionEntity) {
        LOGGER.info("Se ha ejecutado el metodo updateExtensionById");
        try {
            ExtensionEntity existingExtensions = extensionRepository.findById(id_extension).orElseThrow(
                    () -> new ResourceNotFoundException("No se ha encontrado la extension con el id: "
                            .concat(id_extension.toString()), HttpStatus.NOT_FOUND)
            );

            existingExtensions.setClave_dgp(extensionEntity.getClave_dgp());
            existingExtensions.setAbreviatura(extensionEntity.getAbreviatura());
            existingExtensions.setNombre_completo(extensionEntity.getNombre_completo());
            existingExtensions.setDireccion_completa(extensionEntity.getDireccion_completa());

            existingExtensions.setFecha_actualizacion(LocalDateTime.now());;

            return existingExtensions;
        } catch (Exception e) {
            LOGGER.error("Error al intentar actualizar la extension: {}", extensionEntity.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public List<ExtensionEntity> getAllExtensionesByUnidadId(Long id_unidad) {
        LOGGER.info("Se ha ejecutado el metodo getAllExtensionesByUnidadId");
        try {
            return extensionRepository.findAllByUnidadId(id_unidad);
        } catch (Exception e) {
            LOGGER.error("Error al intentar traer las extension por id unidad {}", id_unidad.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }

    }

    @Override
    public ExtensionEntity getExtensionById(Long id_extension) {
        LOGGER.info("Se ha ejecutado el metodo getExtensionById");

        return extensionRepository.findById(id_extension).orElseThrow(
                () -> new ResourceNotFoundException("No se ha encontrado la extension con el id: "
                        .concat(id_extension.toString()), HttpStatus.NOT_FOUND)
        );
    }

    @Override
    public HashMap<String, String> deleteExtensionById(Long id) {
        LOGGER.info("Se a ejecutado el metodo deleteExtensionById");
        try {
            ExtensionEntity existingExtension = extensionRepository.findById(id).orElse(null);
            if (existingExtension != null) {
                HashMap<String, String> response = new HashMap<>();
                response.put("message", String.format("La extension con el id %s ha sido elimido exitosamente!", id.toString()));

                extensionRepository.deleteById(id);

                LOGGER.debug("Se ha eliminado la extension con el id: {}", id.toString());
                return response;
            }
            return null;
        } catch (Exception e) {
            LOGGER.error("Error al intentar elimniar la extension por id {}", id.toString());
            throw new RuntimeException("Runtime exception: ".concat(e.getMessage()));
        }
    }

    @Override
    public Boolean checkDependersExtension(Long id) {
        return null;
    }
}
