package edu.tsj.aula.persistance.models.control.mapper;

import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarRequestDto;
import edu.tsj.aula.persistance.models.control.dto.areaDto.AreaEscolarResponseDto;
import edu.tsj.aula.persistance.models.control.entity.AreaEscolarEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AreaEscolarMapper {
    // Entity -> ResponseDTO
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.area", target = "area")
    @Mapping(source = "entity.responsable", target = "responsable")
    @Mapping(source = "entity.unidad_academica", target = "unidad_academica")
    @Mapping(source = "entity.realizado_por", target = "realizado_por")
    @Mapping(source = "entity.actualizado_por", target = "actualizado_por")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    AreaEscolarResponseDto entityToResponse(AreaEscolarEntity entity);

    // RequestDto -> Entity
    @Mapping(source = "request.area", target = "area")
    @Mapping(source = "request.responsable", target = "responsable")
    @Mapping(source = "request.unidad_academica", target = "unidad_academica")
    @Mapping(source = "request.realizado_por", target = "realizado_por")
    @Mapping(source = "request.actualizado_por", target = "actualizado_por")
    AreaEscolarEntity requestToEntity(AreaEscolarRequestDto request);

}
