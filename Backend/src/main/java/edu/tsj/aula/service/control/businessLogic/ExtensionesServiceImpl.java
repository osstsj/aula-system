package edu.tsj.aula.service.control.businessLogic;

import edu.tsj.aula.configuration.exception.ResourceNotFoundException;
import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;
import edu.tsj.aula.persistance.repository.control.ExtensionRepository;
import edu.tsj.aula.persistance.repository.control.PlantelRepository;
import edu.tsj.aula.service.control.IExtensionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ExtensionesServiceImpl implements IExtensionService {
    private final PlantelRepository plantelRepository;
    private final ExtensionRepository extensionRepository;

    @Override
    public ExtensionEntity createExtensionByPlantelId(Long id_plantel, ExtensionEntity extensionEntity) {
        plantelRepository.findById(id_plantel).map(plantelEntity -> {
            extensionEntity.setPlantel(plantelEntity);
            return extensionRepository.save(extensionEntity);
        })
        .orElseThrow(() -> new ResourceNotFoundException("No se encontro plantel con id: ".concat(id_plantel.toString()),
                        HttpStatus.NOT_FOUND));


        return extensionEntity;
    }

    @Override
    public ExtensionEntity updateExtensionByIdAndPlanelId(Long id_plantel, Long id_extension) {
        return null;
    }

    @Override
    public List<ExtensionEntity> getAllExtensionesByPlantelId(Long id_plantel) {
        return extensionRepository.findByPlantelId(id_plantel);
    }
}
