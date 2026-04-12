package com.AML2A.Rest_Api.controller;

import com.AML2A.Rest_Api.model.User;
import com.AML2A.Rest_Api.repository.UserRepository;
import com.AML2A.Rest_Api.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.util.Collections;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    static class LoginRequest {
        public String username;
        public String password;
    }

    static class SignupRequest {
        public String username;
        public String password;
    }

    static class JwtResponse {
        public String token;
        public Long id;
        public String username;
        public JwtResponse(String token, Long id, String username) {
            this.token = token;
            this.id = id;
            this.username = username;
        }
    }

    static class MessageResponse {
        public String message;
        public MessageResponse(String message) { this.message = message; }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);
        
        org.springframework.security.core.userdetails.User userDetails = 
          (org.springframework.security.core.userdetails.User) authentication.getPrincipal(); 

        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        return ResponseEntity.ok(new JwtResponse(jwt, user.getId(), user.getUsername()));
    }

    static class GoogleLoginRequest {
        public String idToken;
    }

    @PostMapping("/google")
    public ResponseEntity<?> authenticateGoogleUser(@RequestBody GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList("645693566583-q5ch9p6u6hibsmnq7ipe40ob62thv9qj.apps.googleusercontent.com"))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.idToken);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();

                Optional<User> userOpt = userRepository.findByUsername(email);
                User user;
                if (userOpt.isPresent()) {
                    user = userOpt.get();
                } else {
                    user = new User(email, encoder.encode("OAUTH_PLACEHOLDER_PASSWORD")); 
                    user.setFullName((String) payload.get("name"));
                    userRepository.save(user);
                }

                String jwt = jwtUtil.generateTokenFromUsername(user.getUsername());
                return ResponseEntity.ok(new JwtResponse(jwt, user.getId(), user.getUsername()));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Invalid Google token."));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Google auth failed: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.username)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        User user = new User(signUpRequest.username,
                             encoder.encode(signUpRequest.password));

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
