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
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepo categoryRepo;

    public Category getById(String id) {
        System.out.println(id);
    return categoryRepo.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("no category found by id: "+ id)));
    }

    public List<Category> getAll() {
        return categoryRepo.findAll();
    }

    public List<Category> getAvailableCategories() {
        return categoryRepo.findCategoriesWithoutEditor();
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

    public void removeUserFromCategoriesByUserId(String id) {
       List<Category> categories = categoryRepo.findCategoriesByUserId(id);
        for (Category category:categories) {
            category.setUser(null);
            categoryRepo.save(category);
        }
    }

    public void deleteById(String id) {
        if (!categoryRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("could not find category by id:" + id));
        }
        categoryRepo.deleteById(id);
    }



}
