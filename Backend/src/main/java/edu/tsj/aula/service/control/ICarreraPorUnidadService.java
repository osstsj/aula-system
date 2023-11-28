package edu.tsj.aula.service.control;

import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadResponseDto;

import java.util.HashMap;
import java.util.List;

public interface ICarreraPorUnidadService {
    CarreraPorUnidadResponseDto createCarreraPorUnidad(CarreraPorUnidadRequestDto carreraPorUnidadRequestDto, Long id_unidad, Long id_carrera);

    List<CarreraPorUnidadResponseDto> getAllCarrerasPorUnidad();

    CarreraPorUnidadResponseDto getCarreraPorUnidadById(Long id);

    List<CarreraPorUnidadResponseDto> getCarreraPorUnidadEntitiesByUnidad_academicaId(Long id_unidad);

    CarreraPorUnidadResponseDto updateCarreraPorUnidadById(Long id, CarreraPorUnidadRequestDto carreraPorUnidadRequestDto, Long id_unidad, Long id_carrera);

    HashMap<String, String> deleteCarreraPorUnidadById(Long id);

    Boolean checkCarreraPorUnidadById(Long id);
}
