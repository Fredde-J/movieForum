package com.example.demo.repositories;

import com.example.demo.entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category,String> {
}
