package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.TypeTache;
import com.mycompany.myapp.repository.TypeTacheRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TypeTacheResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TypeTacheResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_COULEUR = "AAAAAAAAAA";
    private static final String UPDATED_COULEUR = "BBBBBBBBBB";

    @Autowired
    private TypeTacheRepository typeTacheRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeTacheMockMvc;

    private TypeTache typeTache;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeTache createEntity(EntityManager em) {
        TypeTache typeTache = new TypeTache()
            .nom(DEFAULT_NOM)
            .couleur(DEFAULT_COULEUR);
        return typeTache;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeTache createUpdatedEntity(EntityManager em) {
        TypeTache typeTache = new TypeTache()
            .nom(UPDATED_NOM)
            .couleur(UPDATED_COULEUR);
        return typeTache;
    }

    @BeforeEach
    public void initTest() {
        typeTache = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeTache() throws Exception {
        int databaseSizeBeforeCreate = typeTacheRepository.findAll().size();
        // Create the TypeTache
        restTypeTacheMockMvc.perform(post("/api/type-taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeTache)))
            .andExpect(status().isCreated());

        // Validate the TypeTache in the database
        List<TypeTache> typeTacheList = typeTacheRepository.findAll();
        assertThat(typeTacheList).hasSize(databaseSizeBeforeCreate + 1);
        TypeTache testTypeTache = typeTacheList.get(typeTacheList.size() - 1);
        assertThat(testTypeTache.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTypeTache.getCouleur()).isEqualTo(DEFAULT_COULEUR);
    }

    @Test
    @Transactional
    public void createTypeTacheWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeTacheRepository.findAll().size();

        // Create the TypeTache with an existing ID
        typeTache.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeTacheMockMvc.perform(post("/api/type-taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeTache)))
            .andExpect(status().isBadRequest());

        // Validate the TypeTache in the database
        List<TypeTache> typeTacheList = typeTacheRepository.findAll();
        assertThat(typeTacheList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTypeTaches() throws Exception {
        // Initialize the database
        typeTacheRepository.saveAndFlush(typeTache);

        // Get all the typeTacheList
        restTypeTacheMockMvc.perform(get("/api/type-taches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeTache.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].couleur").value(hasItem(DEFAULT_COULEUR)));
    }
    
    @Test
    @Transactional
    public void getTypeTache() throws Exception {
        // Initialize the database
        typeTacheRepository.saveAndFlush(typeTache);

        // Get the typeTache
        restTypeTacheMockMvc.perform(get("/api/type-taches/{id}", typeTache.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeTache.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.couleur").value(DEFAULT_COULEUR));
    }
    @Test
    @Transactional
    public void getNonExistingTypeTache() throws Exception {
        // Get the typeTache
        restTypeTacheMockMvc.perform(get("/api/type-taches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeTache() throws Exception {
        // Initialize the database
        typeTacheRepository.saveAndFlush(typeTache);

        int databaseSizeBeforeUpdate = typeTacheRepository.findAll().size();

        // Update the typeTache
        TypeTache updatedTypeTache = typeTacheRepository.findById(typeTache.getId()).get();
        // Disconnect from session so that the updates on updatedTypeTache are not directly saved in db
        em.detach(updatedTypeTache);
        updatedTypeTache
            .nom(UPDATED_NOM)
            .couleur(UPDATED_COULEUR);

        restTypeTacheMockMvc.perform(put("/api/type-taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeTache)))
            .andExpect(status().isOk());

        // Validate the TypeTache in the database
        List<TypeTache> typeTacheList = typeTacheRepository.findAll();
        assertThat(typeTacheList).hasSize(databaseSizeBeforeUpdate);
        TypeTache testTypeTache = typeTacheList.get(typeTacheList.size() - 1);
        assertThat(testTypeTache.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTypeTache.getCouleur()).isEqualTo(UPDATED_COULEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeTache() throws Exception {
        int databaseSizeBeforeUpdate = typeTacheRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeTacheMockMvc.perform(put("/api/type-taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeTache)))
            .andExpect(status().isBadRequest());

        // Validate the TypeTache in the database
        List<TypeTache> typeTacheList = typeTacheRepository.findAll();
        assertThat(typeTacheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeTache() throws Exception {
        // Initialize the database
        typeTacheRepository.saveAndFlush(typeTache);

        int databaseSizeBeforeDelete = typeTacheRepository.findAll().size();

        // Delete the typeTache
        restTypeTacheMockMvc.perform(delete("/api/type-taches/{id}", typeTache.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeTache> typeTacheList = typeTacheRepository.findAll();
        assertThat(typeTacheList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
