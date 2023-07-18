package com.certeslegal.backend.model;

import lombok.*;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "office")
public class Office {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "office_id")
    private Long id;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Column(name = "city_latitude", nullable = false)
    private Float cityLatitude;

    @Column(name = "city_longitude", nullable = false)
    private Float cityLongitude;
    
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    private String address;
}
