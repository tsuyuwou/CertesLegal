package com.certeslegal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.certeslegal.backend.model.Office;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {
    
}
