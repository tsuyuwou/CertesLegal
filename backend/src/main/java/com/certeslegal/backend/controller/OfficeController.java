package com.certeslegal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.certeslegal.backend.model.Office;
import com.certeslegal.backend.repository.OfficeRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class OfficeController {

    private final OfficeRepository officeRepository;

    @Autowired
    public OfficeController(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }
    
    // get all offices
    @GetMapping("offices")
    @ResponseStatus(HttpStatus.OK)
    public List<Office> getAllOffices() {
        return officeRepository.findAll();
    }
}
