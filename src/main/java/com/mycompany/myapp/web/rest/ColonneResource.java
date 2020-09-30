package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Colonne;
import com.mycompany.myapp.repository.ColonneRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Colonne}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ColonneResource {

    private final Logger log = LoggerFactory.getLogger(ColonneResource.class);

    private static final String ENTITY_NAME = "colonne";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ColonneRepository colonneRepository;

    public ColonneResource(ColonneRepository colonneRepository) {
        this.colonneRepository = colonneRepository;
    }

    /**
     * {@code POST  /colonnes} : Create a new colonne.
     *
     * @param colonne the colonne to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new colonne, or with status {@code 400 (Bad Request)} if the colonne has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/colonnes")
    public ResponseEntity<Colonne> createColonne(@RequestBody Colonne colonne) throws URISyntaxException {
        log.debug("REST request to save Colonne : {}", colonne);
        if (colonne.getId() != null) {
            throw new BadRequestAlertException("A new colonne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colonne result = colonneRepository.save(colonne);
        return ResponseEntity.created(new URI("/api/colonnes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /colonnes} : Updates an existing colonne.
     *
     * @param colonne the colonne to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated colonne,
     * or with status {@code 400 (Bad Request)} if the colonne is not valid,
     * or with status {@code 500 (Internal Server Error)} if the colonne couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/colonnes")
    public ResponseEntity<Colonne> updateColonne(@RequestBody Colonne colonne) throws URISyntaxException {
        log.debug("REST request to update Colonne : {}", colonne);
        if (colonne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Colonne result = colonneRepository.save(colonne);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, colonne.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /colonnes} : get all the colonnes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of colonnes in body.
     */
    @GetMapping("/colonnes")
    public List<Colonne> getAllColonnes() {
        log.debug("REST request to get all Colonnes");
        return colonneRepository.findAll();
    }

    /**
     * {@code GET  /colonnes/:id} : get the "id" colonne.
     *
     * @param id the id of the colonne to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the colonne, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/colonnes/{id}")
    public ResponseEntity<Colonne> getColonne(@PathVariable Long id) {
        log.debug("REST request to get Colonne : {}", id);
        Optional<Colonne> colonne = colonneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(colonne);
    }

    /**
     * {@code DELETE  /colonnes/:id} : delete the "id" colonne.
     *
     * @param id the id of the colonne to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/colonnes/{id}")
    public ResponseEntity<Void> deleteColonne(@PathVariable Long id) {
        log.debug("REST request to delete Colonne : {}", id);
        colonneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
