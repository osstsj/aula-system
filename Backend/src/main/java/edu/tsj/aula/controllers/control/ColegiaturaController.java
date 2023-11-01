package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaResponseDto;
import edu.tsj.aula.service.control.IColegiaturaService;
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
public class ColegiaturaController {
    private final IColegiaturaService colegiaturaService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="/colegiatura",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<ColegiaturaResponseDto> createColegiatura(@Valid @RequestBody ColegiaturaRequestDto colegiaturaRequestDto) {
        try {
            var result = colegiaturaService.createColegiatura(colegiaturaRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/colegiaturas",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<ColegiaturaResponseDto>> getAllColegiaturas() {
        try {
            List<ColegiaturaResponseDto> colegiaturas = colegiaturaService.getAllColegiaturas();
            return new ResponseEntity<>(colegiaturas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/colegiatura/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<ColegiaturaResponseDto> getColegiaturaById(@PathVariable Long id) {
        try {
            var result = colegiaturaService.getColegiaturaById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value="/colegiatura/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<ColegiaturaResponseDto> updateColegiaturaById(@PathVariable Long id,@Valid @RequestBody ColegiaturaRequestDto colegiaturaRequestDto) {
        try {
            var result = colegiaturaService.updateColegiaturaById(id, colegiaturaRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/colegiatura/{id}")
    public ResponseEntity<HashMap<String, String>> deleteColegiaturaById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = colegiaturaService.deleteColegiaturaById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
