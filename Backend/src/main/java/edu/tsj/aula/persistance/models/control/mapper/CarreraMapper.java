package edu.tsj.aula.persistance.models.control.mapper;

import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraRequestDto;
import edu.tsj.aula.persistance.models.control.dto.carreraDto.CarreraResponseDto;
import edu.tsj.aula.persistance.models.control.entity.CarreraEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy =  ReportingPolicy.IGNORE)
public interface CarreraMapper {
    // Entity -> ResponseDTO
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.abreviatura", target = "abreviatura")
    @Mapping(source = "entity.nombre", target = "nombre")
    @Mapping(source = "entity.dgp", target = "dgp")
    @Mapping(source = "entity.plan_estudio", target = "plan_estudio")
    @Mapping(source = "entity.estatus", target = "estatus")
    @Mapping(source = "entity.clave_programa", target = "clave_programa")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    CarreraResponseDto entityToResponse(CarreraEntity entity);

    // RequestDto -> Entity
    @Mapping(source = "request.abreviatura", target = "abreviatura")
    @Mapping(source = "request.nombre", target = "nombre")
    @Mapping(source = "request.dgp", target = "dgp")
    @Mapping(source = "request.plan_estudio", target = "plan_estudio")
    @Mapping(source = "request.estatus", target = "estatus")
    @Mapping(source = "request.clave_programa", target = "clave_programa")
    CarreraEntity requestToEntity(CarreraRequestDto request);

}
