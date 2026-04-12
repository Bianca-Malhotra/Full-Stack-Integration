package com.AML2A.Rest_Api.repository;

import com.AML2A.Rest_Api.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByUserIdOrderByTimestampDesc(Long userId);
    Location findTopByUserIdOrderByTimestampDesc(Long userId);
}
