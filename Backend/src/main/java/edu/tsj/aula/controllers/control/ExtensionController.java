package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;
import edu.tsj.aula.service.control.IExtensionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class ExtensionController {
    private final IExtensionService extensionService;

    @PostMapping("/extension/{id_unidad}")
    public ResponseEntity<ExtensionEntity> createExtensionByUnidadId(
            @PathVariable Long id_unidad, @Valid  @RequestBody ExtensionEntity extensionEntity) {
        try {
           var result = extensionService.createExtensionByUnidadId(id_unidad, extensionEntity);
           return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/extensiones/{id_unidad}")
    public ResponseEntity<List<ExtensionEntity>> getAllExtensionsByUnidadId(@PathVariable Long id_unidad) {
        try {
            var result = extensionService.getAllExtensionesByUnidadId(id_unidad);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/extension/{id_unidad}")
    public ResponseEntity<ExtensionEntity> updateExtensionById(@PathVariable Long id_unidad,  @Valid  @RequestBody ExtensionEntity extensionEntity) {
        try {
            var result = extensionService.updateExtensionById(id_unidad, extensionEntity);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/extension/{id}")
    public ResponseEntity<HashMap<String, String>> deleteExtensionById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = extensionService.deleteExtensionById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/extension/{id}")
    public ResponseEntity<ExtensionEntity> getExtensionById(@PathVariable Long id) {
        try {
            var result = extensionService.getExtensionById(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
