package com.finapp.finapp.config;

import com.finapp.finapp.entity.Role;
import com.finapp.finapp.entity.User;
import com.finapp.finapp.repository.RoleRepository;
import com.finapp.finapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        // Initialize roles
        Role userRole = roleRepository.findByName("ROLE_USER").orElseGet(() -> {
            Role r = new Role();
            r.setName("ROLE_USER");
            return roleRepository.save(r);
        });

        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
            Role r = new Role();
            r.setName("ROLE_ADMIN");
            return roleRepository.save(r);
        });

        // Create default admin user if it doesn't exist
        if (userRepository.findByEmail("admin@finapp.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("Admin User");
            admin.setEmail("admin@finapp.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.getRoles().add(adminRole);
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@finapp.com / admin123");
        }

        // Create default regular user if it doesn't exist
        if (userRepository.findByEmail("user@finapp.com").isEmpty()) {
            User user = new User();
            user.setFullName("Test User");
            user.setEmail("user@finapp.com");
            user.setPassword(passwordEncoder.encode("password123"));
            user.getRoles().add(userRole);
            userRepository.save(user);
            System.out.println("Default user created: user@finapp.com / password123");
        }
    }
}



