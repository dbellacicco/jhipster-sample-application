package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TypeTache.
 */
@Entity
@Table(name = "type_tache")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TypeTache implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "couleur")
    private String couleur;

    @OneToMany(mappedBy = "typeTache")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Tache> taches = new HashSet<>();

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

    public TypeTache nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCouleur() {
        return couleur;
    }

    public TypeTache couleur(String couleur) {
        this.couleur = couleur;
        return this;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public Set<Tache> getTaches() {
        return taches;
    }

    public TypeTache taches(Set<Tache> taches) {
        this.taches = taches;
        return this;
    }

    public TypeTache addTaches(Tache tache) {
        this.taches.add(tache);
        tache.setTypeTache(this);
        return this;
    }

    public TypeTache removeTaches(Tache tache) {
        this.taches.remove(tache);
        tache.setTypeTache(null);
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
        if (!(o instanceof TypeTache)) {
            return false;
        }
        return id != null && id.equals(((TypeTache) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypeTache{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", couleur='" + getCouleur() + "'" +
            "}";
    }
}
