package com.certeslegal.backend.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.certeslegal.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // method to find a user by their email
    public User findByEmail(String email);

    // query method to query jobs a user has applied to
    @Query(value = "SELECT job_id FROM users_jobs WHERE user_id = :id", nativeQuery = true)
    public Set<Integer> findJobApps(Integer id);
}
