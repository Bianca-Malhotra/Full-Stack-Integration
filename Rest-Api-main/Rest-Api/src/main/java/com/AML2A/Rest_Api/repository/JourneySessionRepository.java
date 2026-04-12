package com.AML2A.Rest_Api.repository;

import com.AML2A.Rest_Api.model.JourneySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneySessionRepository extends JpaRepository<JourneySession, Long> {
    JourneySession findTopByUserIdAndSharingActiveTrueOrderByStartedAtDesc(Long userId);
}
