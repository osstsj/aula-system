package edu.tsj.aula.persistance.repository.control;

import edu.tsj.aula.persistance.models.control.entity.ExtensionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExtensionRepository extends JpaRepository<ExtensionEntity, Long> {
    List<ExtensionEntity> findByUnidadId(Long id_unidad);
}
