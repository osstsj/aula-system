package edu.tsj.aula.persistance.models.control.mapper;

import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraPorUnidadDto.CarreraPorUnidadResponseDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraPorUnidadEntity;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy =  ReportingPolicy.IGNORE)
public interface CarreraPorUnidadMapper {
    // Entity - ResponseDTO
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.carrera_nombre", target = "carrera_nombre")
    @Mapping(source = "entity.nivel", target = "nivel")
    @Mapping(source = "entity.unidad_academica", target = "unidad_academica")
    @Mapping(source = "entity.modalidad", target = "modalidad")
    @Mapping(source = "entity.realizado_por", target = "realizado_por")
    @Mapping(source = "entity.actualizado_por", target = "actualizado_por")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    CarreraPorUnidadResponseDto entityToResponse(CarreraPorUnidadEntity entity);

    // RequestDto -> Entity
    @Mapping(source = "request.carrera_nombre", target = "carrera_nombre")
    @Mapping(source = "request.nivel", target = "nivel")
    @Mapping(source = "request.unidad_academica", target = "unidad_academica")
    @Mapping(source = "request.modalidad", target = "modalidad")
    @Mapping(source = "request.realizado_por", target = "realizado_por")
    @Mapping(source = "request.actualizado_por", target = "actualizado_por")
    CarreraPorUnidadEntity requestToEntity(CarreraPorUnidadRequestDto request);

}
