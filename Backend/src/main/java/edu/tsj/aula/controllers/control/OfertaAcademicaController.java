package edu.tsj.aula.controllers.control;

import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaResposeDto;
import edu.tsj.aula.service.control.IOfertaAcademicaService;
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
public class OfertaAcademicaController {
    private final IOfertaAcademicaService ofertaAcademicaService;

    @PostMapping(value="/oferta_academica",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<OfertaAcademicaResposeDto> createOfertaAcademica(
            @Valid @RequestBody OfertaAcademicaRequestDto ofertaAcademicaRequestDto) {
        try {
            var result = ofertaAcademicaService.createOfertaAcademica(ofertaAcademicaRequestDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/ofertas_academicas",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<List<OfertaAcademicaResposeDto>> getAllOfertasAcademicas() {
        try {
            List<OfertaAcademicaResposeDto> ofertas = ofertaAcademicaService.getAllOfertasAcademicas();
            return new ResponseEntity<>(ofertas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/oferta_academica/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<OfertaAcademicaResposeDto> getOfertaAcademicaById(@PathVariable Long id) {
        try {
            var result = ofertaAcademicaService.getOfertaAcademicaById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value="/oferta_academica/{id}",
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_PROBLEM_JSON_VALUE})
    public ResponseEntity<OfertaAcademicaResposeDto> updateOfertaAcademicaById(
            @PathVariable Long id,@Valid @RequestBody OfertaAcademicaRequestDto ofertaAcademicaRequestDto) {
        try {
            var result = ofertaAcademicaService.updateOfertaAcademicaById(id, ofertaAcademicaRequestDto);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/oferta_academica/{id}")
    public ResponseEntity<HashMap<String, String>> deleteOfertaAcademicaById(@PathVariable Long id) {
        try {
            HashMap<String, String> response = ofertaAcademicaService.deleteOfertaAcademicaById(id);
            if (response != null)
                return ResponseEntity.ok(response);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
