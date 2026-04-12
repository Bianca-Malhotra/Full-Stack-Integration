package com.AML2A.Rest_Api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "journey_sessions")
public class JourneySession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String destinationName;
    private Double destinationLat;
    private Double destinationLng;
    private String sharedContactIds;
    private Boolean sharingActive = true;
    private Boolean destinationReached = false;
    private LocalDateTime startedAt = LocalDateTime.now();
    private LocalDateTime reachedAt;

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getDestinationName() { return destinationName; }
    public void setDestinationName(String destinationName) { this.destinationName = destinationName; }
    public Double getDestinationLat() { return destinationLat; }
    public void setDestinationLat(Double destinationLat) { this.destinationLat = destinationLat; }
    public Double getDestinationLng() { return destinationLng; }
    public void setDestinationLng(Double destinationLng) { this.destinationLng = destinationLng; }
    public String getSharedContactIds() { return sharedContactIds; }
    public void setSharedContactIds(String sharedContactIds) { this.sharedContactIds = sharedContactIds; }
    public Boolean getSharingActive() { return sharingActive; }
    public void setSharingActive(Boolean sharingActive) { this.sharingActive = sharingActive; }
    public Boolean getDestinationReached() { return destinationReached; }
    public void setDestinationReached(Boolean destinationReached) { this.destinationReached = destinationReached; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getReachedAt() { return reachedAt; }
    public void setReachedAt(LocalDateTime reachedAt) { this.reachedAt = reachedAt; }
}
