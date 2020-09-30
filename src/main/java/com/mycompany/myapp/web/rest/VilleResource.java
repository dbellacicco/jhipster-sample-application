package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Ville;
import com.mycompany.myapp.repository.VilleRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Ville}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VilleResource {

    private final Logger log = LoggerFactory.getLogger(VilleResource.class);

    private static final String ENTITY_NAME = "ville";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VilleRepository villeRepository;

    public VilleResource(VilleRepository villeRepository) {
        this.villeRepository = villeRepository;
    }

    /**
     * {@code POST  /villes} : Create a new ville.
     *
     * @param ville the ville to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ville, or with status {@code 400 (Bad Request)} if the ville has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/villes")
    public ResponseEntity<Ville> createVille(@RequestBody Ville ville) throws URISyntaxException {
        log.debug("REST request to save Ville : {}", ville);
        if (ville.getId() != null) {
            throw new BadRequestAlertException("A new ville cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ville result = villeRepository.save(ville);
        return ResponseEntity.created(new URI("/api/villes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /villes} : Updates an existing ville.
     *
     * @param ville the ville to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ville,
     * or with status {@code 400 (Bad Request)} if the ville is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ville couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/villes")
    public ResponseEntity<Ville> updateVille(@RequestBody Ville ville) throws URISyntaxException {
        log.debug("REST request to update Ville : {}", ville);
        if (ville.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ville result = villeRepository.save(ville);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ville.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /villes} : get all the villes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of villes in body.
     */
    @GetMapping("/villes")
    public List<Ville> getAllVilles() {
        log.debug("REST request to get all Villes");
        return villeRepository.findAll();
    }

    /**
     * {@code GET  /villes/:id} : get the "id" ville.
     *
     * @param id the id of the ville to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ville, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/villes/{id}")
    public ResponseEntity<Ville> getVille(@PathVariable Long id) {
        log.debug("REST request to get Ville : {}", id);
        Optional<Ville> ville = villeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ville);
    }

    /**
     * {@code DELETE  /villes/:id} : delete the "id" ville.
     *
     * @param id the id of the ville to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/villes/{id}")
    public ResponseEntity<Void> deleteVille(@PathVariable Long id) {
        log.debug("REST request to delete Ville : {}", id);
        villeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
