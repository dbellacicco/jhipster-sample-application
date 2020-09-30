package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DeveloppeurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Developpeur.class);
        Developpeur developpeur1 = new Developpeur();
        developpeur1.setId(1L);
        Developpeur developpeur2 = new Developpeur();
        developpeur2.setId(developpeur1.getId());
        assertThat(developpeur1).isEqualTo(developpeur2);
        developpeur2.setId(2L);
        assertThat(developpeur1).isNotEqualTo(developpeur2);
        developpeur1.setId(null);
        assertThat(developpeur1).isNotEqualTo(developpeur2);
    }
}
