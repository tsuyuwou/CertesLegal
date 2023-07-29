package com.certeslegal.backend.model;

import lombok.*;
import jakarta.persistence.*;

// a class that contains job details
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job")
public class Job {

    // enum for job type
    public enum JobType {
        FULLTIME("Full-time"),
        PARTTIME("Part-time"),
        INTERNSHIP("Internship"),
        SEASONAL("Seasonal"),
        TEMPORARY("Temporary");

        private final String label;

        private JobType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static JobType fromLabel(String label) {
            if (label == null) {
                return null;
            }
            for (JobType type : JobType.values()) {
                if (type.getLabel().equals(label)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid type label: " + label);
        }
    }

    // enum for job domain
    public enum Domain {
        CIVIL_LAW("Civil Law"),
        ADMINISTRATIVE_LAW("Administrative Law"),
        DIGITAL_MARKETING("Digital Marketing"),
        IT("IT"),
        EXECUTIVE("Executive");

        private final String label;

        private Domain(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static Domain fromLabel(String label) {
            if (label == null) {
                return null;
            }
            for (Domain domain : Domain.values()) {
                if (domain.getLabel().equals(label)) {
                    return domain;
                }
            }
            throw new IllegalArgumentException("Invalid domain label: " + label);
        }
    }

    // enum for job location
    public enum Location {
        CHENNAI("Chennai, India"),
        NEW_DELHI("New Delhi, India"),
        MUMBAI("Mumbai, India"),
        KOLKATA("Kolkata, India"),
        REMOTE_INDIA("Remote (India)");

        private final String label;

        private Location(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static Location fromLabel(String label) {
            if (label == null) {
                return null;
            }
            for (Location location : Location.values()) {
                if (location.getLabel().equals(label)) {
                    return location;
                }
            }
            throw new IllegalArgumentException("Invalid location label: " + label);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Domain domain;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Location location;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    // get job type enum label
    public String getType() {
        return type.getLabel();
    }

    // get job domain enum label
    public String getDomain() {
        return domain.getLabel();
    }

    // get job location enum label
    public String getLocation() {
        return location.getLabel();
    }
}
