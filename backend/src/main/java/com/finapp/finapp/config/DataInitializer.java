package com.finapp.finapp.config;

import com.finapp.finapp.entity.Role;
import com.finapp.finapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            Role r = new Role();
            r.setName("ROLE_USER");
            roleRepository.save(r);
        }
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            Role r = new Role();
            r.setName("ROLE_ADMIN");
            roleRepository.save(r);
        }
    }
}



