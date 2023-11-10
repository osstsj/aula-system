package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;
import edu.tsj.aula.service.control.IExtensionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ExtensionController {
    private final IExtensionService extensionService;

    @PostMapping("/extension/{id_unidad}")
    public ExtensionEntity createExtensionByUnidadId(
            @PathVariable Long id_unidad, @RequestBody ExtensionEntity extensionEntity) {
        return extensionService.createExtensionByUnidadId(id_unidad, extensionEntity);
    }

    @GetMapping("/extensiones/{id_unidad}")
    public List<ExtensionEntity> getAllExtensionsByUnidadId(@PathVariable Long id_unidad) {
        return extensionService.getAllExtensionesByUnidadId(id_unidad);
    }
}
