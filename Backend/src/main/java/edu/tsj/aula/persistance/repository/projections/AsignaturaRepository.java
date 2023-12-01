package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.projections.entity.asignatura.IComparacionAsignaturaDto;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioAsignaturaEntity;
import edu.tsj.aula.persistance.models.projections.entity.asignatura.AsignaturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AsignaturaRepository  extends JpaRepository<AsignaturaEntity, Long> {
    @Query("SELECT AE FROM AsignaturaEntity as AE WHERE AE.folio= :id_folio")
    List<AsignaturaEntity> findAllByFolio(FolioAsignaturaEntity id_folio);

    @Query(value = "SELECT PA.unidad_academica.nombre_completo AS nombre_Ua,  " +
            "PAP.nombre_docente.nombre_completo as nombre_Docente,\n" +
            "PAHSAA.subtotal_1 AS subtotal_1_1,\n" +
            "PAHSAA2.subtotal_1 AS subtotal_1_2,\n" +
            "PAHSAA2.subtotal_1 - PAHSAA.subtotal_1 AS com_Subtotal_1,\n" +
            "\n" +
            "PAHNI.subtotal_2 AS subtotal_2_1,\n" +
            "PAHNI2.subtotal_2 AS subtotal_2_2,\n" +
            "PAHNI2.subtotal_2 - PAHNI.subtotal_2 AS com_Subtotal_2,\n" +
            "\n" +
            "PA.total AS total_1,\n" +
            "PA2.total AS total_2,\n" +
            "PA2.total - PA.total AS com_Total,\n" +
            "CASE" +
            "   WHEN PA2.total - PA.total < 0 THEN" +
            "      CASE " +
            "           WHEN ABS(PA2.total - PA.total) >= 5 " +
            "               THEN 'ROJO'\n" +
            "           ELSE 'NEGRO'\n" +
            "       END\n" +
            "   WHEN (PA2.total - PA.total) > 0 AND (PA2.total - PA.total) < 5" +
            "        THEN 'NEGRO' \n" +
            "   ELSE 'VERDE'\n" +
            "END AS bandera\n" +
            "\n" +
            "FROM AsignaturaEntity AS PA\n" +
            "JOIN AsignaturaEntity AS PA2 ON PA.id <> PA2.id\n" +
            "\n" +
            "LEFT JOIN \n" +
            "HorasSustantivasAtencionAlumnosAsignatura AS PAHSAA ON \n" +
            "PA.horas_sustantivas_atencion_alumnos.id = PAHSAA.id  \n" +
            "LEFT JOIN \n" +
            "HorasSustantivasAtencionAlumnosAsignatura AS PAHSAA2 ON \n" +
            "PA2.horas_sustantivas_atencion_alumnos.id = PAHSAA2.id  \n" +
            "\n" +
            "LEFT JOIN \n" +
            "HorasNecesidadInstitucionalAsignatura AS PAHNI ON\n" +
            "PA.horas_necesidad_institucional.id = PAHNI.id\n" +
            "LEFT JOIN \n" +
            "HorasNecesidadInstitucionalAsignatura AS PAHNI2 ON\n" +
            "PA2.horas_necesidad_institucional.id = PAHNI2.id\n" +
            "\n" +
            "LEFT JOIN \n" +
            "ProfeAsignatura AS PAP ON PA.profe_asignatura.id = PAP.id \n" +
            "LEFT JOIN \n" +
            "ProfeAsignatura AS PAP2 ON \n" +
            "PA2.profe_asignatura.id = PAP2.id\n" +
            "\n" +
            "WHERE PA.folio.id =:id_folio_1 AND PA2.folio.id =:id_folio_2 AND  PAP.nombre_docente.id = PAP2.nombre_docente.id")
    List<IComparacionAsignaturaDto> showComparativeAsignaturaByIdsFolios(Long id_folio_1, Long id_folio_2);

    @Query(value = "SELECT PA.unidad_academica.nombre_completo AS nombre_Ua,  " +
            "PAP.nombre_docente.nombre_completo as nombre_Docente,\n" +
            "PAHSAA.subtotal_1 AS subtotal_1_1,\n" +
            "PAHSAA2.subtotal_1 AS subtotal_1_2,\n" +
            "PAHSAA2.subtotal_1 - PAHSAA.subtotal_1 AS com_Subtotal_1,\n" +
            "\n" +
            "PAHNI.subtotal_2 AS subtotal_2_1,\n" +
            "PAHNI2.subtotal_2 AS subtotal_2_2,\n" +
            "PAHNI2.subtotal_2 - PAHNI.subtotal_2 AS com_Subtotal_2,\n" +
            "\n" +
            "PA.total AS total_1,\n" +
            "PA2.total AS total_2,\n" +
            "PA2.total - PA.total AS com_Total,\n" +
            "CASE" +
            "   WHEN PA2.total - PA.total < 0 THEN\n" +
            "      CASE " +
            "           WHEN ABS(PA2.total - PA.total) >= 5\n " +
            "               THEN 'ROJO'\n" +
            "           ELSE 'NEGRO'\n" +
            "       END\n" +
            "   WHEN (PA2.total - PA.total) > 0 AND (PA2.total - PA.total) < 5\n" +
            "        THEN 'NEGRO' \n" +
            "   ELSE 'VERDE'\n" +
            "END AS bandera\n" +
            "\n" +
            "FROM AsignaturaEntity AS PA\n" +
            "JOIN AsignaturaEntity AS PA2 ON PA.id <> PA2.id\n" +
            "\n" +
            "LEFT JOIN \n" +
            "HorasSustantivasAtencionAlumnosAsignatura AS PAHSAA ON \n" +
            "PA.horas_sustantivas_atencion_alumnos.id = PAHSAA.id  \n" +
            "LEFT JOIN \n" +
            "HorasSustantivasAtencionAlumnosAsignatura AS PAHSAA2 ON \n" +
            "PA2.horas_sustantivas_atencion_alumnos.id = PAHSAA2.id  \n" +
            "\n" +
            "LEFT JOIN \n" +
            "HorasNecesidadInstitucionalAsignatura AS PAHNI ON\n" +
            "PA.horas_necesidad_institucional.id = PAHNI.id\n" +
            "LEFT JOIN \n" +
            "HorasNecesidadInstitucionalAsignatura AS PAHNI2 ON\n" +
            "PA2.horas_necesidad_institucional.id = PAHNI2.id\n" +
            "\n" +
            "LEFT JOIN \n" +
            "ProfeAsignatura AS PAP ON PA.profe_asignatura.id = PAP.id \n" +
            "LEFT JOIN \n" +
            "ProfeAsignatura AS PAP2 ON \n" +
            "PA2.profe_asignatura.id = PAP2.id\n" +
            "\n" +
            "WHERE PA.folio.id =:id_folio_1 AND PA2.folio.id =:id_folio_2 AND  PAP.nombre_docente.id= :id_docente AND PAP2.nombre_docente.id= :id_docente")
    Optional<IComparacionAsignaturaDto> showComparativeAsignaturaByIdsFoliosAndDocenteId(Long id_folio_1, Long id_folio_2, Long id_docente);
}
