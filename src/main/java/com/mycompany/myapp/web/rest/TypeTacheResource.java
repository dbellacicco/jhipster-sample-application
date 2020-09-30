package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TypeTache;
import com.mycompany.myapp.repository.TypeTacheRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TypeTache}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeTacheResource {

    private final Logger log = LoggerFactory.getLogger(TypeTacheResource.class);

    private static final String ENTITY_NAME = "typeTache";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeTacheRepository typeTacheRepository;

    public TypeTacheResource(TypeTacheRepository typeTacheRepository) {
        this.typeTacheRepository = typeTacheRepository;
    }

    /**
     * {@code POST  /type-taches} : Create a new typeTache.
     *
     * @param typeTache the typeTache to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeTache, or with status {@code 400 (Bad Request)} if the typeTache has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-taches")
    public ResponseEntity<TypeTache> createTypeTache(@RequestBody TypeTache typeTache) throws URISyntaxException {
        log.debug("REST request to save TypeTache : {}", typeTache);
        if (typeTache.getId() != null) {
            throw new BadRequestAlertException("A new typeTache cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeTache result = typeTacheRepository.save(typeTache);
        return ResponseEntity.created(new URI("/api/type-taches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-taches} : Updates an existing typeTache.
     *
     * @param typeTache the typeTache to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeTache,
     * or with status {@code 400 (Bad Request)} if the typeTache is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeTache couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-taches")
    public ResponseEntity<TypeTache> updateTypeTache(@RequestBody TypeTache typeTache) throws URISyntaxException {
        log.debug("REST request to update TypeTache : {}", typeTache);
        if (typeTache.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeTache result = typeTacheRepository.save(typeTache);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeTache.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /type-taches} : get all the typeTaches.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeTaches in body.
     */
    @GetMapping("/type-taches")
    public List<TypeTache> getAllTypeTaches() {
        log.debug("REST request to get all TypeTaches");
        return typeTacheRepository.findAll();
    }

    /**
     * {@code GET  /type-taches/:id} : get the "id" typeTache.
     *
     * @param id the id of the typeTache to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeTache, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-taches/{id}")
    public ResponseEntity<TypeTache> getTypeTache(@PathVariable Long id) {
        log.debug("REST request to get TypeTache : {}", id);
        Optional<TypeTache> typeTache = typeTacheRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeTache);
    }

    /**
     * {@code DELETE  /type-taches/:id} : delete the "id" typeTache.
     *
     * @param id the id of the typeTache to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-taches/{id}")
    public ResponseEntity<Void> deleteTypeTache(@PathVariable Long id) {
        log.debug("REST request to delete TypeTache : {}", id);
        typeTacheRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
