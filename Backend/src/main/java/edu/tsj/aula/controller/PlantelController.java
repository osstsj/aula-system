package edu.tsj.aula.controller;

import edu.tsj.aula.model.Plantel;
import edu.tsj.aula.service.implementation.PlantelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // change for react's host
@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PlantelController {
    private final PlantelService plantelService;

    @PostMapping("/plantel")
    @ResponseStatus(HttpStatus.CREATED)
    public Plantel createPlantel(@RequestBody Plantel plantel) {
        return plantelService.savePlantel(plantel);
    }

    @GetMapping("/planteles")
    public List<Plantel> getAllPlanteles() {
        return plantelService.getAllPlanteles();
    }

    @GetMapping("/plantel/{id}")
    public ResponseEntity<Plantel> getPlantelById(@PathVariable Long id) {
        return plantelService.getPlantelById(id)
                .map(ResponseEntity::ok)
                .orElseGet(()-> ResponseEntity.notFound().build());
    }


}
