package com.AML2A.Rest_Api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "risk_logs")
public class RiskLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Double riskScore;
    private String details;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public RiskLog() {}
    public RiskLog(Long userId, Double riskScore, String details) {
        this.userId = userId;
        this.riskScore = riskScore;
        this.details = details;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Double getRiskScore() { return riskScore; }
    public String getDetails() { return details; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
