package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;
import edu.tsj.aula.persistance.repository.control.ExtensionRepository;
import edu.tsj.aula.persistance.repository.control.UnidadRepository;
import edu.tsj.aula.service.control.IExtensionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class ExtensionesServiceImpl implements IExtensionService {
    private final UnidadRepository unidadRepository;
    private final ExtensionRepository extensionRepository;

    @Transactional
    @Override
    public ExtensionEntity createExtensionByUnidadId(Long id_unidad, ExtensionEntity extensionEntity) {
        unidadRepository.findById(id_unidad).map(unidadEntity -> {
            extensionEntity.setUnidad(unidadEntity);
            return extensionRepository.save(extensionEntity);
        })
        .orElseThrow(() -> new ResourceNotFoundException("No se encontro la unidad con id: ".concat(id_unidad.toString()),
                        HttpStatus.NOT_FOUND));


        return extensionEntity;
    }

    @Override
    public ExtensionEntity updateExtensionByIdAndUnidadId(Long id_unidad, Long id_extension) {
        return null;
    }

    @Override
    public List<ExtensionEntity> getAllExtensionesByUnidadId(Long id_unidad) {
        return extensionRepository.findByUnidadId(id_unidad);
    }
}
