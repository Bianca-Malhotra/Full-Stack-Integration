package com.AML2A.Rest_Api.repository;

import com.AML2A.Rest_Api.model.CheckInTimer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CheckInTimerRepository extends JpaRepository<CheckInTimer, Long> {
    CheckInTimer findTopByUserIdAndConfirmedFalseOrderByCreatedAtDesc(Long userId);
    List<CheckInTimer> findByConfirmedFalseAndAlertTriggeredFalseAndExpectedAtBefore(LocalDateTime time);
}
