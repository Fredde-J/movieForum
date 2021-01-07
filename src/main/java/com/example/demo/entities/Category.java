package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.List;

@NoArgsConstructor
@Data
public class Category {
    @Id
    private String id;
    @Size(min = 3, max = 20 )
    private String name;
    @Valid
    @DBRef
    private User user;


    public Category(String name, User user) {
        this.name = name;
        this.user = user;
    }


}
