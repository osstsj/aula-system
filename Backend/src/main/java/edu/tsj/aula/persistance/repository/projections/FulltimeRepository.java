package edu.tsj.aula.persistance.repository.projections;

import edu.tsj.aula.persistance.models.projections.entity.completo.FullTimeEntity;
import edu.tsj.aula.persistance.models.projections.entity.completo.IComparacionFulltimeDto;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FulltimeRepository extends JpaRepository<FullTimeEntity, Long> {
    @Query("SELECT FT FROM FullTimeEntity AS FT WHERE FT.folio= :id_folio")
    List<FullTimeEntity> findAllByFolio(FolioFulltimeEntity id_folio);

    @Query(value = "SELECT PF.folio.unidad_academica.nombre_completo AS nombre_Ua,"+
            "PFP.nombre_docente.nombre_completo AS nombre_Docente,\n" +
            "PFHSAA.horas_frente_grupo AS horas_Grupo_1,\n" +
            "PFHSAA2.horas_frente_grupo AS horas_Grupo_2,\n" +
            "PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo AS com_Horas_Grupo,\n" +
            "PF.Total AS total_1,\n" +
            "PF2.Total AS total_2,\n" +
            "PF2.Total - PF.Total AS com_Total,\n" +
            "\n" +
            "CASE \n" +
            "   WHEN PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo < 0 THEN \n" +
            "       CASE \n" +
            "           WHEN ABS(PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo) >= 5 \n" +
            "               THEN 'ROJO' \n" +
            "           ELSE 'NEGRO'\n" +
            "       END \n" +
            "   WHEN (PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo) >= 0 AND (PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo) < 5\n" +
            "       THEN 'NEGRO'\n" +
            "   ELSE 'VERDE'\n" +
            "END AS bandera\n" +
            "\n" +
            "FROM FullTimeEntity AS PF \n" +
            "JOIN FullTimeEntity AS PF2 ON PF.id <> PF2.id\n" +
            "\n" +
            "LEFT JOIN\n" +
            "HorasSustantivasAtencionAlumnosFulltime AS PFHSAA  ON\n" +
            "PF.horas_sustantivas_atencion_alumnos_fulltime.id = PFHSAA.id\n" +
            "LEFT JOIN \n" +
            "HorasSustantivasAtencionAlumnosFulltime AS PFHSAA2  ON\n" +
            "PF2.horas_sustantivas_atencion_alumnos_fulltime.id = PFHSAA2.id\n" +
            "\n" +
            "LEFT JOIN \n" +
            "ProfesorFulltimeEntity AS PFP ON PF.profesor_fulltime.id  = PFP.id \n" +
            "LEFT JOIN \n" +
            "ProfesorFulltimeEntity AS PFP2 ON PF2.profesor_fulltime.id  = PFP2.id\n" +
            "\n" +
            "WHERE PF.folio.id =:id_folio_1 AND PF2.folio.id =:id_folio_2  AND PFP.nombre_docente.id = PFP2.nombre_docente.id")
    List<IComparacionFulltimeDto> showComparativeAsignaturaByIdsFolios(Long id_folio_1, Long id_folio_2);

    @Query(value = "SELECT PF.folio.unidad_academica.nombre_completo AS nombre_Ua,"+
            "PFP.nombre_docente.nombre_completo AS nombre_Docente,\n" +
            "PFHSAA.horas_frente_grupo AS horas_Grupo_1,\n" +
            "PFHSAA2.horas_frente_grupo AS horas_Grupo_2,\n" +
            "PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo AS com_Horas_Grupo,\n" +
            "PF.Total AS total_1,\n" +
            "PF2.Total AS total_2,\n" +
            "PF2.Total - PF.Total AS com_Total,\n" +
            "\n" +
            "CASE \n" +
            "   WHEN PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo < 0 THEN \n" +
            "       CASE \n" +
            "           WHEN ABS(PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo) >= 5 \n" +
            "               THEN 'ROJO' \n" +
            "           ELSE 'NEGRO'\n" +
            "       END \n" +
            "   WHEN (PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo) >= 0 AND (PFHSAA2.horas_frente_grupo - PFHSAA.horas_frente_grupo) < 5\n" +
            "       THEN 'NEGRO'\n" +
            "   ELSE 'VERDE'\n" +
            "END AS bandera\n" +
            "   \n" +
            "FROM FullTimeEntity AS PF \n" +
            "JOIN FullTimeEntity AS PF2 ON PF.id <> PF2.id\n" +
            "\n" +
            "LEFT JOIN\n" +
            "HorasSustantivasAtencionAlumnosFulltime AS PFHSAA  ON\n" +
            "PF.horas_sustantivas_atencion_alumnos_fulltime.id = PFHSAA.id\n" +
            "LEFT JOIN \n" +
            "HorasSustantivasAtencionAlumnosFulltime AS PFHSAA2  ON\n" +
            "PF2.horas_sustantivas_atencion_alumnos_fulltime.id = PFHSAA2.id\n" +
            "\n" +
            "LEFT JOIN \n" +
            "ProfesorFulltimeEntity AS PFP ON PF.profesor_fulltime.id  = PFP.id \n" +
            "LEFT JOIN \n" +
            "ProfesorFulltimeEntity AS PFP2 ON PF2.profesor_fulltime.id  = PFP2.id\n" +
            "\n" +
            "WHERE PF.folio.id =:id_folio_1 AND PF2.folio.id =:id_folio_2  AND PFP.nombre_docente.id = :id_docente AND PFP2.nombre_docente.id= :id_docente")
    Optional<IComparacionFulltimeDto> showComparativeAsignaturaByIdsFoliosAndDocenteId(Long id_folio_1, Long id_folio_2, Long id_docente);
}
