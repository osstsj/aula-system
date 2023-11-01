package edu.tsj.aula.persistance.models.control.mapper;

import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.OfertaAcademicaDto.OfertaAcademicaResposeDto;
import edu.tsj.aula.persistance.models.control.entity.OfertaAcademicaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OfertaAcademicaMapper {
    // Entity -> ResponseDTO
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.unidad", target = "unidad")
    @Mapping(source = "entity.carrera", target = "carrera")
    @Mapping(source = "entity.modalidad", target = "modalidad")
    @Mapping(source = "entity.turno", target = "turno")
    @Mapping(source = "entity.periodo", target = "periodo")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    OfertaAcademicaResposeDto entityToResponse(OfertaAcademicaEntity entity);

    // RequestDTO -> Entity
    @Mapping(source = "request.unidad", target = "unidad")
    @Mapping(source = "request.carrera", target = "carrera")
    @Mapping(source = "request.modalidad", target = "modalidad")
    @Mapping(source = "request.turno", target = "turno")
    @Mapping(source = "request.periodo", target = "periodo")
    OfertaAcademicaEntity requestToEntity(OfertaAcademicaRequestDto request);
}
