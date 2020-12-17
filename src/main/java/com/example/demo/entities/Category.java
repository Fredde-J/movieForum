package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@NoArgsConstructor
@Data
public class Category {
    @Id
    public String id;
    public String name;
    //@DBRef
    //public Tread treads


    public Category(String name) {
        this.name = name;
    }
}
