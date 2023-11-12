package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraResponseDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;

import java.util.HashMap;
import java.util.List;

public interface ICarreraService {
    CarreraResponseDto createCarrera(CarreraRequestDto carreraRequestDto);

    List<CarreraResponseDto> getAllCarreras();


    CarreraResponseDto getCarreraById(Long id);

    CarreraResponseDto updateCarreraById(Long id, CarreraRequestDto carreraRequestDto);

    HashMap<String, String> deleteCarreraById(Long id);
}
