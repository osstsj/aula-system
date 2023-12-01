package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;

import java.util.HashMap;
import java.util.List;

public interface IExtensionService {
    ExtensionEntity createExtensionByUnidadId(Long id_plantel, ExtensionEntity extensionEntity);

    ExtensionEntity updateExtensionById(Long id_extension, ExtensionEntity extensionEntity);

    List<ExtensionEntity> getAllExtensionesByUnidadId(Long id_unidad);

    ExtensionEntity getExtensionById(Long id_extension);

    HashMap<String, String> deleteExtensionById(Long id);

    Boolean checkDependersExtension(Long id);
}
