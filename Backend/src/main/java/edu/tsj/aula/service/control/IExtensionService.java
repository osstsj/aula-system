package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;

import java.util.List;

public interface IExtensionService {
    ExtensionEntity createExtensionByPlantelId(Long id_plantel, ExtensionEntity extensionEntity);

    ExtensionEntity updateExtensionByIdAndPlanelId(Long id_plantel, Long id_extension);

    List<ExtensionEntity> getAllExtensionesByPlantelId(Long id_plantel);
}
