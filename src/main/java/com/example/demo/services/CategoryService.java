package com.example.demo.services;

import com.example.demo.entities.Category;
import com.example.demo.entities.User;
import com.example.demo.repositories.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.lang.module.ResolutionException;

@Service
public class CategoryService {
    @Autowired
    CategoryRepo categoryRepo;

    public Category getById(String id) {
        System.out.println(id);
    return categoryRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("no category found by id: "+ id)));
    }

    public Category save(Category category) {
      return categoryRepo.save(category);
    }


    public void update(String id, Category category) {
        if (!categoryRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("could not find category by id:" + id));
        }
        category.setId(id);
        categoryRepo.save(category);
    }

    public void deleteById(String id) {
        if (!categoryRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("could not find category by id:" + id));
        }
        categoryRepo.deleteById(id);
    }
}
