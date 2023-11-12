package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarRequestDto;
import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarResponseDto;
import edu.tsj.aula.service.control.IAreaEscolarService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class AreaEscolarController {
    private final IAreaEscolarService areaEscolarService;

    @PostMapping(value="area_escolar_by_unidad/{id_unidad}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<AreaEscolarResponseDto> createAreaEscolar(
            @Valid @RequestBody AreaEscolarRequestDto areaEscolarRequestDto, @PathVariable Long id_unidad) {
        try {
            var result = areaEscolarService.createAreaEscolar(areaEscolarRequestDto, id_unidad);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/areas_escolares",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<AreaEscolarResponseDto>> getAllAreasEscolares() {
        try {
            List<AreaEscolarResponseDto> areas = areaEscolarService.getAllAreasEscolares();
            return new ResponseEntity<>(areas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/area_escolar/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<AreaEscolarResponseDto> getAreaEscolarById(@PathVariable Long id) {
        try {
            var result = areaEscolarService.getAreaEscolarById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value="/area_escolar/{id}/unidad/{id_unidad}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<AreaEscolarResponseDto> updateAreaEscolarById(
            @PathVariable Long id,@Valid @RequestBody AreaEscolarRequestDto areaEscolarRequestDto,
            @PathVariable Long id_unidad) {
        try {
            var result = areaEscolarService.updateAreaEscolar(id, areaEscolarRequestDto, id_unidad);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/area_escolar/{id}")
    public ResponseEntity<HashMap<String, String>> deleteAreaEscolarById(@PathVariable Long id) {
       try {
           HashMap<String, String> response = areaEscolarService.deleteAreaEscolarById(id);
           if (response != null)
               return ResponseEntity.ok(response);
           return ResponseEntity.notFound().build();
       } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
