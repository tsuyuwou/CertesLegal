package com.certeslegal.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import com.certeslegal.backend.repository.UserRepository;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;

    // method to test the findJobApps method from the UserRepository interface
    @Test
    void testFindJobApps() {
        Set<Integer> jobApps = userRepository.findJobApps(1);
        assertEquals(1, jobApps.size());
        assertTrue(jobApps.contains(3));
    }
}
