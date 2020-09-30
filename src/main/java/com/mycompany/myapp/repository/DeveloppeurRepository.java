package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Developpeur;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Developpeur entity.
 */
@Repository
public interface DeveloppeurRepository extends JpaRepository<Developpeur, Long> {

    @Query(value = "select distinct developpeur from Developpeur developpeur left join fetch developpeur.projets left join fetch developpeur.taches",
        countQuery = "select count(distinct developpeur) from Developpeur developpeur")
    Page<Developpeur> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct developpeur from Developpeur developpeur left join fetch developpeur.projets left join fetch developpeur.taches")
    List<Developpeur> findAllWithEagerRelationships();

    @Query("select developpeur from Developpeur developpeur left join fetch developpeur.projets left join fetch developpeur.taches where developpeur.id =:id")
    Optional<Developpeur> findOneWithEagerRelationships(@Param("id") Long id);
}
