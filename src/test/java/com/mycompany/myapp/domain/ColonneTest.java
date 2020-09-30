package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ColonneTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colonne.class);
        Colonne colonne1 = new Colonne();
        colonne1.setId(1L);
        Colonne colonne2 = new Colonne();
        colonne2.setId(colonne1.getId());
        assertThat(colonne1).isEqualTo(colonne2);
        colonne2.setId(2L);
        assertThat(colonne1).isNotEqualTo(colonne2);
        colonne1.setId(null);
        assertThat(colonne1).isNotEqualTo(colonne2);
    }
}
