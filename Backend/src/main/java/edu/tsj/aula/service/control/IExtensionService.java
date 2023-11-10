package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;

import java.util.List;

public interface IExtensionService {
    ExtensionEntity createExtensionByUnidadId(Long id_plantel, ExtensionEntity extensionEntity);

    ExtensionEntity updateExtensionByIdAndUnidadId(Long id_unidad, Long id_extension);

    List<ExtensionEntity> getAllExtensionesByUnidadId(Long id_unidad);
}
