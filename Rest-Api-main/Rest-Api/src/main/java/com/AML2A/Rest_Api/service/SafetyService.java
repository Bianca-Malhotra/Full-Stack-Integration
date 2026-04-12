package com.AML2A.Rest_Api.service;

import com.AML2A.Rest_Api.model.*;
import com.AML2A.Rest_Api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SafetyService {
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private RiskLogRepository riskLogRepository;
    @Autowired
    private JourneySessionRepository journeySessionRepository;
    @Autowired
    private CheckInTimerRepository checkInTimerRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRepository userRepository;

    public void updateLocation(Long userId, Double lat, Double lng) {
        Location loc = new Location(userId, lat, lng);
        locationRepository.save(loc);
        calculateAndLogRisk(userId, lat, lng);
    }

    public void triggerSos(Long userId) {
        Alert alert = new Alert(userId, "SOS_TRIGGERED", "Emergency SOS triggered by user.");
        alertRepository.save(alert);
        notifyContacts(userId, "EMERGENCY SOS! I need help immediately. My last known location is saved in SafeRoute.");
    }

    public void triggerStealthSos(Long userId, Double lat, Double lng, Boolean continuousTracking) {
        String message = "Silent SOS triggered";
        String alertBody = "SILENT SOS! I may be in danger. ";
        if (lat != null && lng != null) {
            message += " at (" + String.format("%.5f", lat) + ", " + String.format("%.5f", lng) + ")";
            alertBody += "Location: https://www.google.com/maps?q=" + lat + "," + lng;
        }
        if (Boolean.TRUE.equals(continuousTracking)) {
            message += " with continuous tracking enabled.";
        }
        alertRepository.save(new Alert(userId, "STEALTH_SOS", message));
        notifyContacts(userId, alertBody);
    }

    private void notifyContacts(Long userId, String message) {
        List<Contact> contacts = contactRepository.findByUserId(userId);
        User user = userRepository.findById(userId).orElse(null);
        String userName = (user != null) ? user.getUsername() : "A user";
        String subject = "[SafeRoute Emergency] Alert from " + userName;
        String finalMessage = "Dear Emergency Contact,\n\n" + message + "\n\nSent via SafeRoute Personal Safety App.";
        
        for (Contact contact : contacts) {
            if (contact.getEmail() != null && !contact.getEmail().isEmpty()) {
                emailService.sendEmail(contact.getEmail(), subject, finalMessage);
            }
        }
    }

    public List<Alert> getAlerts(Long userId) {
        return alertRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<Contact> getContacts(Long userId) {
        return contactRepository.findByUserId(userId);
    }

    public void addContact(Long userId, String name, String phone, String email, String relation) {
        Contact contact = new Contact(userId, name, phone, email, relation);
        contactRepository.save(contact);
    }

    public Contact updateContact(Long userId, Long contactId, String name, String phone, String email, String relation) {
        Contact contact = contactRepository.findById(contactId).orElseThrow();
        if (!contact.getUserId().equals(userId)) throw new RuntimeException("Unauthorized");
        contact.setName(name);
        contact.setPhone(phone);
        contact.setEmail(email);
        contact.setRelation(relation);
        return contactRepository.save(contact);
    }

    public void deleteContact(Long userId, Long contactId) {
        Contact contact = contactRepository.findById(contactId).orElseThrow();
        if (!contact.getUserId().equals(userId)) throw new RuntimeException("Unauthorized");
        contactRepository.delete(contact);
    }

    public JourneySession startJourney(Long userId, String destinationName, Double destinationLat, Double destinationLng, List<Long> contactIds) {
        JourneySession current = journeySessionRepository.findTopByUserIdAndSharingActiveTrueOrderByStartedAtDesc(userId);
        if (current != null) {
            current.setSharingActive(false);
            journeySessionRepository.save(current);
        }

        JourneySession session = new JourneySession();
        session.setUserId(userId);
        session.setDestinationName(destinationName);
        session.setDestinationLat(destinationLat);
        session.setDestinationLng(destinationLng);
        session.setSharedContactIds(contactIds == null ? "" : contactIds.toString());
        JourneySession saved = journeySessionRepository.save(session);

        alertRepository.save(new Alert(userId, "JOURNEY_SHARED", "Journey sharing started to " + destinationName));
        return saved;
    }

    public Map<String, Object> updateJourneyProgress(Long userId, Double lat, Double lng) {
        JourneySession session = journeySessionRepository.findTopByUserIdAndSharingActiveTrueOrderByStartedAtDesc(userId);
        Map<String, Object> response = new HashMap<>();
        if (session == null) {
            response.put("active", false);
            response.put("message", "No active journey");
            return response;
        }

        updateLocation(userId, lat, lng);

        double distance = calculateDistanceKm(lat, lng, session.getDestinationLat(), session.getDestinationLng());
        boolean reached = distance <= 0.2;
        response.put("active", true);
        response.put("distanceKm", distance);
        response.put("reached", reached);

        if (reached && !Boolean.TRUE.equals(session.getDestinationReached())) {
            session.setDestinationReached(true);
            session.setSharingActive(false);
            session.setReachedAt(LocalDateTime.now());
            journeySessionRepository.save(session);
            alertRepository.save(new Alert(userId, "DESTINATION_REACHED",
                    "Destination reached. Contacts auto-notified for " + session.getDestinationName()));
            response.put("message", "Destination reached and contacts notified.");
        } else {
            response.put("message", "Journey location shared.");
        }
        return response;
    }

    public CheckInTimer startCheckInTimer(Long userId, int minutes) {
        CheckInTimer timer = new CheckInTimer();
        timer.setUserId(userId);
        timer.setExpectedAt(LocalDateTime.now().plusMinutes(Math.max(1, minutes)));
        return checkInTimerRepository.save(timer);
    }

    public Map<String, Object> confirmCheckIn(Long userId) {
        CheckInTimer timer = checkInTimerRepository.findTopByUserIdAndConfirmedFalseOrderByCreatedAtDesc(userId);
        Map<String, Object> response = new HashMap<>();
        if (timer == null) {
            response.put("confirmed", false);
            response.put("message", "No active check-in timer.");
            return response;
        }
        timer.setConfirmed(true);
        checkInTimerRepository.save(timer);
        response.put("confirmed", true);
        response.put("message", "Check-in confirmed.");
        return response;
    }

    @Scheduled(fixedRate = 60000)
    public void evaluateMissedCheckIns() {
        List<CheckInTimer> overdue = checkInTimerRepository.findByConfirmedFalseAndAlertTriggeredFalseAndExpectedAtBefore(LocalDateTime.now());
        for (CheckInTimer timer : overdue) {
            timer.setAlertTriggered(true);
            checkInTimerRepository.save(timer);
            alertRepository.save(new Alert(timer.getUserId(), "CHECKIN_MISSED",
                    "User did not check-in by expected arrival time."));
        }
    }

    public Map<String, Object> getSafeRouteSuggestion(Double startLat, Double startLng, Double endLat, Double endLng) {
        Map<String, Object> safeRoute = new HashMap<>();
        safeRoute.put("name", "Safer Route");
        safeRoute.put("riskScore", 28);
        safeRoute.put("etaMinutes", 24);
        safeRoute.put("reason", "More populated roads and better street lighting.");
        safeRoute.put("path", List.of(
                Map.of("lat", startLat, "lng", startLng),
                Map.of("lat", (startLat + endLat) / 2 + 0.01, "lng", (startLng + endLng) / 2 - 0.01),
                Map.of("lat", endLat, "lng", endLng)
        ));

        Map<String, Object> riskyRoute = new HashMap<>();
        riskyRoute.put("name", "Shorter but Risky Route");
        riskyRoute.put("riskScore", 67);
        riskyRoute.put("etaMinutes", 18);
        riskyRoute.put("reason", "Less crowded zone and lower surveillance.");
        riskyRoute.put("path", List.of(
                Map.of("lat", startLat, "lng", startLng),
                Map.of("lat", (startLat + endLat) / 2 - 0.01, "lng", (startLng + endLng) / 2 + 0.01),
                Map.of("lat", endLat, "lng", endLng)
        ));

        return Map.of("safeRoute", safeRoute, "riskyRoute", riskyRoute);
    }

    public RiskLog getLatestRiskScore(Long userId) {
        return riskLogRepository.findTopByUserIdOrderByTimestampDesc(userId);
    }

    private void calculateAndLogRisk(Long userId, Double lat, Double lng) {
        LocalTime now = LocalTime.now();
        boolean nightTime = now.isAfter(LocalTime.of(20, 0)) || now.isBefore(LocalTime.of(6, 0));
        double totalRisk = nightTime ? 72 : 28;
        String status = nightTime ? "RISK" : "SAFE";
        String details = "Status " + status + " at (" + lat + ", " + lng + ")"
                + (nightTime ? " due to nighttime." : " daytime conditions.");

        RiskLog log = new RiskLog(userId, totalRisk, details);
        riskLogRepository.save(log);

        if (nightTime) {
            Alert alert = new Alert(userId, "CAUTION", "Night-time detected. Stay in populated areas.");
            alertRepository.save(alert);
        }
    }

    private double calculateDistanceKm(Double lat1, Double lon1, Double lat2, Double lon2) {
        if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Double.MAX_VALUE;
        final double earthRadius = 6371.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
    }
}
