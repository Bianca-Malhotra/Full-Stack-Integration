package com.AML2A.Rest_Api.repository;

import com.AML2A.Rest_Api.model.RiskLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskLogRepository extends JpaRepository<RiskLog, Long> {
    List<RiskLog> findByUserIdOrderByTimestampDesc(Long userId);
    RiskLog findTopByUserIdOrderByTimestampDesc(Long userId);
}
