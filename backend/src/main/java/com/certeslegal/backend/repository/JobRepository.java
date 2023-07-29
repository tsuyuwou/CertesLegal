package com.certeslegal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.certeslegal.backend.model.Job;
import com.certeslegal.backend.model.Job.Domain;
import com.certeslegal.backend.model.Job.Location;
import com.certeslegal.backend.model.Job.JobType;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    // query method to query jobs based on selected filters
    @Query("SELECT j FROM Job j WHERE (:type IS NULL OR j.type = :type) AND (:domain IS NULL OR j.domain = :domain) AND (:location IS NULL OR j.location = :location)")
    List<Job> findByFilters(JobType type, Domain domain, Location location);
}
