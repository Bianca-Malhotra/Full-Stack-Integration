package com.AML2A.Rest_Api.controller;

import com.AML2A.Rest_Api.model.*;
import com.AML2A.Rest_Api.repository.UserRepository;
import com.AML2A.Rest_Api.service.SafetyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SafetyController {
    
    @Autowired
    private SafetyService safetyService;

    @Autowired
    private UserRepository userRepository;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElseThrow().getId();
    }

    static class LocationRequest {
        public Double lat;
        public Double lng;
    }

    static class ContactRequest {
        public String name;
        public String phone;
        public String email;
        public String relation;
    }

    static class JourneyRequest {
        public String destinationName;
        public Double destinationLat;
        public Double destinationLng;
        public List<Long> contactIds;
    }

    static class JourneyLocationRequest {
        public Double lat;
        public Double lng;
    }

    static class StealthSosRequest {
        public Double lat;
        public Double lng;
        public Boolean continuousTracking;
    }

    static class CheckInRequest {
        public Integer minutes;
    }

    @PostMapping("/location/update")
    public ResponseEntity<?> updateLocation(@RequestBody LocationRequest req) {
        safetyService.updateLocation(getCurrentUserId(), req.lat, req.lng);
        return ResponseEntity.ok(new AuthController.MessageResponse("Location updated."));
    }

    @PostMapping("/sos")
    public ResponseEntity<?> triggerSos() {
        safetyService.triggerSos(getCurrentUserId());
        return ResponseEntity.ok(new AuthController.MessageResponse("SOS Triggered."));
    }

    @PostMapping("/sos/stealth")
    public ResponseEntity<?> triggerStealthSos(@RequestBody(required = false) StealthSosRequest req) {
        Double lat = req == null ? null : req.lat;
        Double lng = req == null ? null : req.lng;
        Boolean continuous = req == null ? Boolean.FALSE : req.continuousTracking;
        safetyService.triggerStealthSos(getCurrentUserId(), lat, lng, continuous);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<Alert>> getAlerts() {
        return ResponseEntity.ok(safetyService.getAlerts(getCurrentUserId()));
    }

    @GetMapping("/risk-score")
    public ResponseEntity<RiskLog> getRiskScore() {
        return ResponseEntity.ok(safetyService.getLatestRiskScore(getCurrentUserId()));
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getContacts() {
        return ResponseEntity.ok(safetyService.getContacts(getCurrentUserId()));
    }

    @PostMapping("/contacts")
    public ResponseEntity<?> addContact(@RequestBody ContactRequest req) {
        safetyService.addContact(getCurrentUserId(), req.name, req.phone, req.email, req.relation);
        return ResponseEntity.ok(new AuthController.MessageResponse("Contact added."));
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody ContactRequest req) {
        return ResponseEntity.ok(safetyService.updateContact(getCurrentUserId(), id, req.name, req.phone, req.email, req.relation));
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        safetyService.deleteContact(getCurrentUserId(), id);
        return ResponseEntity.ok(new AuthController.MessageResponse("Contact deleted."));
    }

    @GetMapping("/safety-status")
    public ResponseEntity<Map<String, Object>> safetyStatus() {
        RiskLog risk = safetyService.getLatestRiskScore(getCurrentUserId());
        String status = "SAFE";
        if (risk != null && risk.getRiskScore() != null) {
            if (risk.getRiskScore() >= 65) status = "RISK";
            else if (risk.getRiskScore() >= 40) status = "CAUTION";
        }
        return ResponseEntity.ok(Map.of("status", status, "score", risk == null ? 0 : risk.getRiskScore()));
    }

    @PostMapping("/journey/start")
    public ResponseEntity<JourneySession> startJourney(@RequestBody JourneyRequest req) {
        JourneySession session = safetyService.startJourney(
                getCurrentUserId(), req.destinationName, req.destinationLat, req.destinationLng, req.contactIds);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/journey/share-location")
    public ResponseEntity<Map<String, Object>> shareJourneyLocation(@RequestBody JourneyLocationRequest req) {
        return ResponseEntity.ok(safetyService.updateJourneyProgress(getCurrentUserId(), req.lat, req.lng));
    }

    @PostMapping("/checkin/start")
    public ResponseEntity<CheckInTimer> startCheckIn(@RequestBody CheckInRequest req) {
        int minutes = req == null || req.minutes == null ? 15 : req.minutes;
        return ResponseEntity.ok(safetyService.startCheckInTimer(getCurrentUserId(), minutes));
    }

    @PostMapping("/checkin/confirm")
    public ResponseEntity<Map<String, Object>> confirmCheckIn() {
        return ResponseEntity.ok(safetyService.confirmCheckIn(getCurrentUserId()));
    }

    @GetMapping("/route/suggestion")
    public ResponseEntity<Map<String, Object>> routeSuggestion(
            @RequestParam Double startLat,
            @RequestParam Double startLng,
            @RequestParam Double endLat,
            @RequestParam Double endLng) {
        return ResponseEntity.ok(safetyService.getSafeRouteSuggestion(startLat, startLng, endLat, endLng));
    }
}
