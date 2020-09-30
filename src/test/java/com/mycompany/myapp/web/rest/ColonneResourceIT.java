package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Colonne;
import com.mycompany.myapp.repository.ColonneRepository;

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
 * Integration tests for the {@link ColonneResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ColonneResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private ColonneRepository colonneRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restColonneMockMvc;

    private Colonne colonne;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Colonne createEntity(EntityManager em) {
        Colonne colonne = new Colonne()
            .nom(DEFAULT_NOM);
        return colonne;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Colonne createUpdatedEntity(EntityManager em) {
        Colonne colonne = new Colonne()
            .nom(UPDATED_NOM);
        return colonne;
    }

    @BeforeEach
    public void initTest() {
        colonne = createEntity(em);
    }

    @Test
    @Transactional
    public void createColonne() throws Exception {
        int databaseSizeBeforeCreate = colonneRepository.findAll().size();
        // Create the Colonne
        restColonneMockMvc.perform(post("/api/colonnes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(colonne)))
            .andExpect(status().isCreated());

        // Validate the Colonne in the database
        List<Colonne> colonneList = colonneRepository.findAll();
        assertThat(colonneList).hasSize(databaseSizeBeforeCreate + 1);
        Colonne testColonne = colonneList.get(colonneList.size() - 1);
        assertThat(testColonne.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createColonneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colonneRepository.findAll().size();

        // Create the Colonne with an existing ID
        colonne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColonneMockMvc.perform(post("/api/colonnes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(colonne)))
            .andExpect(status().isBadRequest());

        // Validate the Colonne in the database
        List<Colonne> colonneList = colonneRepository.findAll();
        assertThat(colonneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllColonnes() throws Exception {
        // Initialize the database
        colonneRepository.saveAndFlush(colonne);

        // Get all the colonneList
        restColonneMockMvc.perform(get("/api/colonnes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colonne.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)));
    }
    
    @Test
    @Transactional
    public void getColonne() throws Exception {
        // Initialize the database
        colonneRepository.saveAndFlush(colonne);

        // Get the colonne
        restColonneMockMvc.perform(get("/api/colonnes/{id}", colonne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(colonne.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM));
    }
    @Test
    @Transactional
    public void getNonExistingColonne() throws Exception {
        // Get the colonne
        restColonneMockMvc.perform(get("/api/colonnes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColonne() throws Exception {
        // Initialize the database
        colonneRepository.saveAndFlush(colonne);

        int databaseSizeBeforeUpdate = colonneRepository.findAll().size();

        // Update the colonne
        Colonne updatedColonne = colonneRepository.findById(colonne.getId()).get();
        // Disconnect from session so that the updates on updatedColonne are not directly saved in db
        em.detach(updatedColonne);
        updatedColonne
            .nom(UPDATED_NOM);

        restColonneMockMvc.perform(put("/api/colonnes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedColonne)))
            .andExpect(status().isOk());

        // Validate the Colonne in the database
        List<Colonne> colonneList = colonneRepository.findAll();
        assertThat(colonneList).hasSize(databaseSizeBeforeUpdate);
        Colonne testColonne = colonneList.get(colonneList.size() - 1);
        assertThat(testColonne.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingColonne() throws Exception {
        int databaseSizeBeforeUpdate = colonneRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restColonneMockMvc.perform(put("/api/colonnes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(colonne)))
            .andExpect(status().isBadRequest());

        // Validate the Colonne in the database
        List<Colonne> colonneList = colonneRepository.findAll();
        assertThat(colonneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteColonne() throws Exception {
        // Initialize the database
        colonneRepository.saveAndFlush(colonne);

        int databaseSizeBeforeDelete = colonneRepository.findAll().size();

        // Delete the colonne
        restColonneMockMvc.perform(delete("/api/colonnes/{id}", colonne.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Colonne> colonneList = colonneRepository.findAll();
        assertThat(colonneList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
