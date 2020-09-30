package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "date_de_creation")
    private Instant dateDeCreation;

    @Column(name = "date_de_livraison")
    private Instant dateDeLivraison;

    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Tache> taches = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "projets", allowSetters = true)
    private Client client;

    @ManyToOne
    @JsonIgnoreProperties(value = "projets", allowSetters = true)
    private Client client;

    @ManyToMany(mappedBy = "projets")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Developpeur> developpeurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Projet nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Instant getDateDeCreation() {
        return dateDeCreation;
    }

    public Projet dateDeCreation(Instant dateDeCreation) {
        this.dateDeCreation = dateDeCreation;
        return this;
    }

    public void setDateDeCreation(Instant dateDeCreation) {
        this.dateDeCreation = dateDeCreation;
    }

    public Instant getDateDeLivraison() {
        return dateDeLivraison;
    }

    public Projet dateDeLivraison(Instant dateDeLivraison) {
        this.dateDeLivraison = dateDeLivraison;
        return this;
    }

    public void setDateDeLivraison(Instant dateDeLivraison) {
        this.dateDeLivraison = dateDeLivraison;
    }

    public Set<Tache> getTaches() {
        return taches;
    }

    public Projet taches(Set<Tache> taches) {
        this.taches = taches;
        return this;
    }

    public Projet addTaches(Tache tache) {
        this.taches.add(tache);
        tache.setProjet(this);
        return this;
    }

    public Projet removeTaches(Tache tache) {
        this.taches.remove(tache);
        tache.setProjet(null);
        return this;
    }

    public void setTaches(Set<Tache> taches) {
        this.taches = taches;
    }

    public Client getClient() {
        return client;
    }

    public Projet client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Client getClient() {
        return client;
    }

    public Projet client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Developpeur> getDeveloppeurs() {
        return developpeurs;
    }

    public Projet developpeurs(Set<Developpeur> developpeurs) {
        this.developpeurs = developpeurs;
        return this;
    }

    public Projet addDeveloppeurs(Developpeur developpeur) {
        this.developpeurs.add(developpeur);
        developpeur.getProjets().add(this);
        return this;
    }

    public Projet removeDeveloppeurs(Developpeur developpeur) {
        this.developpeurs.remove(developpeur);
        developpeur.getProjets().remove(this);
        return this;
    }

    public void setDeveloppeurs(Set<Developpeur> developpeurs) {
        this.developpeurs = developpeurs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projet)) {
            return false;
        }
        return id != null && id.equals(((Projet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", dateDeCreation='" + getDateDeCreation() + "'" +
            ", dateDeLivraison='" + getDateDeLivraison() + "'" +
            "}";
    }
}
