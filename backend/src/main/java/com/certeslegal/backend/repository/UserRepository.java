package com.certeslegal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.certeslegal.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // method to find a user by their email
    public User findByEmail(String email);
}
