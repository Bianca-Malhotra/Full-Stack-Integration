package com.AML2A.Rest_Api.controller;

import com.AML2A.Rest_Api.model.RiskLog;
import com.AML2A.Rest_Api.service.SafetyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private SafetyService safetyService;

    @GetMapping("/live/{userId}")
    public ResponseEntity<Map<String, Object>> getLiveFeed(@PathVariable Long userId) {
        RiskLog risk = safetyService.getLatestRiskScore(userId);
        
        String status = "OFFLINE";
        double score = 0.0;
        String details = "No telemetry detected.";
        
        if (risk != null) {
            score = risk.getRiskScore() != null ? risk.getRiskScore() : 0.0;
            if (score >= 65) status = "RISK";
            else if (score >= 40) status = "CAUTION";
            else status = "SAFE";
            details = risk.getDetails();
        }

        return ResponseEntity.ok(Map.of(
            "userId", userId,
            "status", status,
            "riskScore", score,
            "details", details,
            "lastSeen", risk != null ? risk.getTimestamp() : "Unknown"
        ));
    }
}
