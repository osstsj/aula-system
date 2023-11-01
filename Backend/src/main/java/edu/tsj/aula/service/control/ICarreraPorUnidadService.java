package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadResponseDto;

import java.util.HashMap;
import java.util.List;

public interface ICarreraPorUnidadService {
    CarreraPorUnidadResponseDto createCarreraPorUnidad(CarreraPorUnidadRequestDto carreraPorUnidadRequestDto);

    List<CarreraPorUnidadResponseDto> getAllCarrerasPorUnidad();

    CarreraPorUnidadResponseDto getCarreraPorUnidadById(Long id);

    CarreraPorUnidadResponseDto updateCarreraPorUnidadById(Long id, CarreraPorUnidadRequestDto carreraPorUnidadRequestDto);

    HashMap<String, String> deleteCarreraPorUnidadById(Long id);
}