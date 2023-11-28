package edu.tsj.aula.persistance.repository.projections.folio;

import edu.tsj.aula.persistance.models.control.entity.UnidadEntity;
import edu.tsj.aula.persistance.models.projections.entity.folio.FolioFulltimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolioFulltimeRespository extends JpaRepository<FolioFulltimeEntity, Long> {
    @Query("SELECT FF FROM FolioFulltimeEntity AS FF WHERE FF.unidad_academica= :id_unidad")
    List<FolioFulltimeEntity> findAllByUnidad_academica(UnidadEntity id_unidad);

    @Query("SELECT COUNT(FF.numero) FROM FolioFulltimeEntity AS FF WHERE FF.unidad_academica.id= :id_unidad AND "+
            "FF.periodo= :periodo AND FF.periodoAoB= :AoB")
    Integer getSecuenciaByUnidad_academicaAndPeriodoAndPeriodoAoB(Long id_unidad, Integer periodo, String AoB);

    @Query("SELECT COUNT(FTE.folio.id) FROM FullTimeEntity AS FTE WHERE FTE.folio.id= :id_folio_fulltime")
    Integer checkFolioFulltimeDependers(Long id_folio_fulltime);
}
