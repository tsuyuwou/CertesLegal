package com.certeslegal.backend.model;

import lombok.*;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job")
public class Job {

    public enum Type {
        FULLTIME("Full-time"),
        PARTTIME("Part-time"),
        INTERNSHIP("Internship"),
        SEASONAL("Seasonal"),
        TEMPORARY("Temporary");

        private final String label;

        private Type(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public static Type fromLabel(String label) {
            if (label == null) {
                return null;
            }
            for (Type type : Type.values()) {
                if (type.getLabel().equals(label)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid type label: " + label);
        }
    }

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
    private Long id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Domain domain;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Location location;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    public String getType() {
        return type.getLabel();
    }

    public String getDomain() {
        return domain.getLabel();
    }

    public String getLocation() {
        return location.getLabel();
    }
}
