package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Developpeur.
 */
@Entity
@Table(name = "developpeur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Developpeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "nom")
    private String nom;

    @Column(name = "date_naissance")
    private Instant dateNaissance;

    @Column(name = "email")
    private String email;

    @Column(name = "nb_taches_en_cours")
    private Integer nbTachesEnCours;

    @Column(name = "numero_carte_bleue")
    private String numeroCarteBleue;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "developpeur_projets",
               joinColumns = @JoinColumn(name = "developpeur_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "projets_id", referencedColumnName = "id"))
    private Set<Projet> projets = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "developpeur_taches",
               joinColumns = @JoinColumn(name = "developpeur_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "taches_id", referencedColumnName = "id"))
    private Set<Tache> taches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public Developpeur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public Developpeur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public Developpeur dateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getEmail() {
        return email;
    }

    public Developpeur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getNbTachesEnCours() {
        return nbTachesEnCours;
    }

    public Developpeur nbTachesEnCours(Integer nbTachesEnCours) {
        this.nbTachesEnCours = nbTachesEnCours;
        return this;
    }

    public void setNbTachesEnCours(Integer nbTachesEnCours) {
        this.nbTachesEnCours = nbTachesEnCours;
    }

    public String getNumeroCarteBleue() {
        return numeroCarteBleue;
    }

    public Developpeur numeroCarteBleue(String numeroCarteBleue) {
        this.numeroCarteBleue = numeroCarteBleue;
        return this;
    }

    public void setNumeroCarteBleue(String numeroCarteBleue) {
        this.numeroCarteBleue = numeroCarteBleue;
    }

    public Set<Projet> getProjets() {
        return projets;
    }

    public Developpeur projets(Set<Projet> projets) {
        this.projets = projets;
        return this;
    }

    public Developpeur addProjets(Projet projet) {
        this.projets.add(projet);
        projet.getDeveloppeurs().add(this);
        return this;
    }

    public Developpeur removeProjets(Projet projet) {
        this.projets.remove(projet);
        projet.getDeveloppeurs().remove(this);
        return this;
    }

    public void setProjets(Set<Projet> projets) {
        this.projets = projets;
    }

    public Set<Tache> getTaches() {
        return taches;
    }

    public Developpeur taches(Set<Tache> taches) {
        this.taches = taches;
        return this;
    }

    public Developpeur addTaches(Tache tache) {
        this.taches.add(tache);
        tache.getDeveloppeurs().add(this);
        return this;
    }

    public Developpeur removeTaches(Tache tache) {
        this.taches.remove(tache);
        tache.getDeveloppeurs().remove(this);
        return this;
    }

    public void setTaches(Set<Tache> taches) {
        this.taches = taches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Developpeur)) {
            return false;
        }
        return id != null && id.equals(((Developpeur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Developpeur{" +
            "id=" + getId() +
            ", prenom='" + getPrenom() + "'" +
            ", nom='" + getNom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", email='" + getEmail() + "'" +
            ", nbTachesEnCours=" + getNbTachesEnCours() +
            ", numeroCarteBleue='" + getNumeroCarteBleue() + "'" +
            "}";
    }
}
