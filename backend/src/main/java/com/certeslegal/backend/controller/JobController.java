package com.certeslegal.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.certeslegal.backend.model.Job;
import com.certeslegal.backend.model.Job.Domain;
import com.certeslegal.backend.model.Job.Location;
import com.certeslegal.backend.model.Job.JobType;
import com.certeslegal.backend.repository.JobRepository;

import lombok.Getter;
import lombok.Setter;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class JobController {

    private final JobRepository jobRepository;

    @Autowired
    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }
    
    // get jobs
    @GetMapping("/jobs")
    @ResponseStatus(HttpStatus.OK)
    public List<Job> getJobs(
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String domain,
        @RequestParam(required = false) String location
    ) {
        if (type == null && domain == null && location == null) {
            return jobRepository.findAll();
        }
        return jobRepository.findByFilters(JobType.fromLabel(type), Domain.fromLabel(domain), Location.fromLabel(location));
    }

    // get filters
    @GetMapping("/jobs/filters")
    @ResponseStatus(HttpStatus.OK)
    public Filters getFilters() {
        Filters filters = new Filters();
        filters.setType(Arrays.stream(JobType.values()).map(JobType::getLabel).collect(Collectors.toList()));
        filters.setDomain(Arrays.stream(Domain.values()).map(Domain::getLabel).collect(Collectors.toList()));
        filters.setLocation(Arrays.stream(Location.values()).map(Location::getLabel).collect(Collectors.toList()));
        return filters;
    }

    // a class to contain all filters
    @Getter
    @Setter
    private static class Filters {
        private List<String> type;
        private List<String> domain;
        private List<String> location;
    }
}
