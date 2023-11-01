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

    @PostMapping("/extension/{id_plantel}")
    public ExtensionEntity createExtensionByPlanteId(@PathVariable Long id_plantel, @RequestBody ExtensionEntity extensionEntity) {
        return extensionService.createExtensionByPlantelId(id_plantel, extensionEntity);
    }

    @GetMapping("/extensiones/{id_plantel}")
    public List<ExtensionEntity> getAllExtensionsByPlantelId(@PathVariable Long id_plantel) {
        return extensionService.getAllExtensionesByPlantelId(id_plantel);
    }
}
