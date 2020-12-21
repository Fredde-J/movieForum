package com.example.demo.repositories;

import com.example.demo.entities.Thread;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepo extends MongoRepository<Thread, String> {
}
