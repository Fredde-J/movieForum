package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User,String> {

    @Query("{'email': ?0}")
    Optional<User> findByEmail(String email);
}
