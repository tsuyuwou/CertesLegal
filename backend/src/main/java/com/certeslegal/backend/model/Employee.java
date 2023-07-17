package com.certeslegal.backend.model;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long id;

    @Column(name = "first_name", length = 20)
    @NotBlank
    private String firstName;

    @Column(name = "last_name", length = 20)
    @NotBlank
    private String lastName;

    @Column(length = 30)
    @NotBlank
    private String position;

    @Column(length = 40)
    private String qualifications;
}
