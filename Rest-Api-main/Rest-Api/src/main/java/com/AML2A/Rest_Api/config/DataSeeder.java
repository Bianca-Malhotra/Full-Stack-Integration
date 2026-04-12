package com.AML2A.Rest_Api.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.AML2A.Rest_Api.model.User;
import com.AML2A.Rest_Api.repository.UserRepository;

@Component
public class DataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        User user = userRepository.findByUsername("demo")
                .orElseGet(() -> {
                    User u = new User();
                    u.setUsername("demo");
                    u.setPassword(passwordEncoder.encode("demo123"));
                    u.setFullName("Demo User");
                    u.setRole("USER");
                    return userRepository.save(u);
                });
        user.setPassword(passwordEncoder.encode("demo123"));
        user.setFullName("Demo User");
        userRepository.save(user);
    }
}
