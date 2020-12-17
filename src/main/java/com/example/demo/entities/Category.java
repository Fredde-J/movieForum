package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@NoArgsConstructor
@Data
public class Category {
    @Id
    private String id;
    private String name;
    @DBRef
    private List<Thread> threads;


    public Category(String name, List<Thread> threads) {
        this.name = name;
        this.threads = threads;
    }
}
