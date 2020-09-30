package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Colonne;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Colonne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColonneRepository extends JpaRepository<Colonne, Long> {
}
