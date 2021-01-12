package com.example.demo.repositories;

import com.example.demo.entities.Post;
import com.example.demo.entities.Thread;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreadRepo extends MongoRepository<Thread, String> {
    @Query("{'category.id': ?0}")
    List<Thread> findByCategoryId(String id);
}
