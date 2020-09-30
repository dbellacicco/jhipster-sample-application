package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Developpeur;
import com.mycompany.myapp.repository.DeveloppeurRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Developpeur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DeveloppeurResource {

    private final Logger log = LoggerFactory.getLogger(DeveloppeurResource.class);

    private static final String ENTITY_NAME = "developpeur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeveloppeurRepository developpeurRepository;

    public DeveloppeurResource(DeveloppeurRepository developpeurRepository) {
        this.developpeurRepository = developpeurRepository;
    }

    /**
     * {@code POST  /developpeurs} : Create a new developpeur.
     *
     * @param developpeur the developpeur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new developpeur, or with status {@code 400 (Bad Request)} if the developpeur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/developpeurs")
    public ResponseEntity<Developpeur> createDeveloppeur(@RequestBody Developpeur developpeur) throws URISyntaxException {
        log.debug("REST request to save Developpeur : {}", developpeur);
        if (developpeur.getId() != null) {
            throw new BadRequestAlertException("A new developpeur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Developpeur result = developpeurRepository.save(developpeur);
        return ResponseEntity.created(new URI("/api/developpeurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /developpeurs} : Updates an existing developpeur.
     *
     * @param developpeur the developpeur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated developpeur,
     * or with status {@code 400 (Bad Request)} if the developpeur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the developpeur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/developpeurs")
    public ResponseEntity<Developpeur> updateDeveloppeur(@RequestBody Developpeur developpeur) throws URISyntaxException {
        log.debug("REST request to update Developpeur : {}", developpeur);
        if (developpeur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Developpeur result = developpeurRepository.save(developpeur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, developpeur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /developpeurs} : get all the developpeurs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of developpeurs in body.
     */
    @GetMapping("/developpeurs")
    public List<Developpeur> getAllDeveloppeurs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Developpeurs");
        return developpeurRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /developpeurs/:id} : get the "id" developpeur.
     *
     * @param id the id of the developpeur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the developpeur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/developpeurs/{id}")
    public ResponseEntity<Developpeur> getDeveloppeur(@PathVariable Long id) {
        log.debug("REST request to get Developpeur : {}", id);
        Optional<Developpeur> developpeur = developpeurRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(developpeur);
    }

    /**
     * {@code DELETE  /developpeurs/:id} : delete the "id" developpeur.
     *
     * @param id the id of the developpeur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/developpeurs/{id}")
    public ResponseEntity<Void> deleteDeveloppeur(@PathVariable Long id) {
        log.debug("REST request to delete Developpeur : {}", id);
        developpeurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
