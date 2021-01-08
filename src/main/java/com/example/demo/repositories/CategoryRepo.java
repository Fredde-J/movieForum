package com.example.demo.repositories;

import com.example.demo.entities.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends MongoRepository<Category,String> {

    @Query("{'user': null}")
    List<Category> findCategoriesWithoutEditor();

    @Query("{'user.id': ?0}")
    List<Category> findCategoriesByUserId(String id);
}
