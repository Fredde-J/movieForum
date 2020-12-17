package com.example.demo.repositories;

import com.example.demo.entities.Thread;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ThreadRepo extends MongoRepository<Thread, String> {
}
