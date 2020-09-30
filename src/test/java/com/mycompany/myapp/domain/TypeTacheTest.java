package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class TypeTacheTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeTache.class);
        TypeTache typeTache1 = new TypeTache();
        typeTache1.setId(1L);
        TypeTache typeTache2 = new TypeTache();
        typeTache2.setId(typeTache1.getId());
        assertThat(typeTache1).isEqualTo(typeTache2);
        typeTache2.setId(2L);
        assertThat(typeTache1).isNotEqualTo(typeTache2);
        typeTache1.setId(null);
        assertThat(typeTache1).isNotEqualTo(typeTache2);
    }
}
