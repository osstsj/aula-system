package edu.tsj.aula.persistance.models.control.mapper;


import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaRequestDto;
import edu.tsj.aula.persistance.models.control.dto.ColegiaturaDto.ColegiaturaResponseDto;
import edu.tsj.aula.persistance.models.control.entity.ColegiaturaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ColegiaturaMapper {
    // Entity -> ResponseDTO
    @Mapping(source = "entity.id", target = "id")
    @Mapping(source = "entity.clave", target = "clave")
    @Mapping(source = "entity.descripcion", target = "descripcion")
    @Mapping(source = "entity.monto", target = "monto")
    @Mapping(source = "entity.colegiatura_estatus", target = "colegiatura_estatus")
    @Mapping(source = "entity.comentarios", target = "comentarios")
    @Mapping(source = "entity.fecha_creacion", target = "fecha_creacion")
    @Mapping(source = "entity.fecha_actualizacion", target = "fecha_actualizacion")
    ColegiaturaResponseDto entityToResponse(ColegiaturaEntity entity);

    // RequestDTO -> Entity
    @Mapping(source = "request.clave", target = "clave")
    @Mapping(source = "request.descripcion", target = "descripcion")
    @Mapping(source = "request.monto", target = "monto")
    @Mapping(source = "request.colegiatura_estatus", target = "colegiatura_estatus")
    @Mapping(source = "request.comentarios", target = "comentarios")
    ColegiaturaEntity requestToEntity(ColegiaturaRequestDto request);
}
