package com.AML2A.Rest_Api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private Double lat;
    private Double lng;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public Location() {}
    public Location(Long userId, Double lat, Double lng) {
        this.userId = userId;
        this.lat = lat;
        this.lng = lng;
    }
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Double getLat() { return lat; }
    public Double getLng() { return lng; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
