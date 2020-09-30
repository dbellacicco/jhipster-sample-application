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
 * A Tache.
 */
@Entity
@Table(name = "tache")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tache implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "intitule")
    private String intitule;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @Column(name = "nb_heures_estimees")
    private Integer nbHeuresEstimees;

    @Column(name = "nb_heures_reelles")
    private Integer nbHeuresReelles;

    @ManyToOne
    @JsonIgnoreProperties(value = "taches", allowSetters = true)
    private Colonne colonne;

    @ManyToOne
    @JsonIgnoreProperties(value = "taches", allowSetters = true)
    private Projet projet;

    @ManyToOne
    @JsonIgnoreProperties(value = "taches", allowSetters = true)
    private TypeTache typeTache;

    @ManyToOne
    @JsonIgnoreProperties(value = "taches", allowSetters = true)
    private Colonne colonne;

    @ManyToOne
    @JsonIgnoreProperties(value = "taches", allowSetters = true)
    private Projet projet;

    @ManyToOne
    @JsonIgnoreProperties(value = "taches", allowSetters = true)
    private TypeTache typeTache;

    @ManyToMany(mappedBy = "taches")
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

    public String getIntitule() {
        return intitule;
    }

    public Tache intitule(String intitule) {
        this.intitule = intitule;
        return this;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public Instant getDateCreation() {
        return dateCreation;
    }

    public Tache dateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Integer getNbHeuresEstimees() {
        return nbHeuresEstimees;
    }

    public Tache nbHeuresEstimees(Integer nbHeuresEstimees) {
        this.nbHeuresEstimees = nbHeuresEstimees;
        return this;
    }

    public void setNbHeuresEstimees(Integer nbHeuresEstimees) {
        this.nbHeuresEstimees = nbHeuresEstimees;
    }

    public Integer getNbHeuresReelles() {
        return nbHeuresReelles;
    }

    public Tache nbHeuresReelles(Integer nbHeuresReelles) {
        this.nbHeuresReelles = nbHeuresReelles;
        return this;
    }

    public void setNbHeuresReelles(Integer nbHeuresReelles) {
        this.nbHeuresReelles = nbHeuresReelles;
    }

    public Colonne getColonne() {
        return colonne;
    }

    public Tache colonne(Colonne colonne) {
        this.colonne = colonne;
        return this;
    }

    public void setColonne(Colonne colonne) {
        this.colonne = colonne;
    }

    public Projet getProjet() {
        return projet;
    }

    public Tache projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }

    public TypeTache getTypeTache() {
        return typeTache;
    }

    public Tache typeTache(TypeTache typeTache) {
        this.typeTache = typeTache;
        return this;
    }

    public void setTypeTache(TypeTache typeTache) {
        this.typeTache = typeTache;
    }

    public Colonne getColonne() {
        return colonne;
    }

    public Tache colonne(Colonne colonne) {
        this.colonne = colonne;
        return this;
    }

    public void setColonne(Colonne colonne) {
        this.colonne = colonne;
    }

    public Projet getProjet() {
        return projet;
    }

    public Tache projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }

    public TypeTache getTypeTache() {
        return typeTache;
    }

    public Tache typeTache(TypeTache typeTache) {
        this.typeTache = typeTache;
        return this;
    }

    public void setTypeTache(TypeTache typeTache) {
        this.typeTache = typeTache;
    }

    public Set<Developpeur> getDeveloppeurs() {
        return developpeurs;
    }

    public Tache developpeurs(Set<Developpeur> developpeurs) {
        this.developpeurs = developpeurs;
        return this;
    }

    public Tache addDeveloppeurs(Developpeur developpeur) {
        this.developpeurs.add(developpeur);
        developpeur.getTaches().add(this);
        return this;
    }

    public Tache removeDeveloppeurs(Developpeur developpeur) {
        this.developpeurs.remove(developpeur);
        developpeur.getTaches().remove(this);
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
        if (!(o instanceof Tache)) {
            return false;
        }
        return id != null && id.equals(((Tache) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tache{" +
            "id=" + getId() +
            ", intitule='" + getIntitule() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", nbHeuresEstimees=" + getNbHeuresEstimees() +
            ", nbHeuresReelles=" + getNbHeuresReelles() +
            "}";
    }
}
