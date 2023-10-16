package com.example.firstjava.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Learners")
public class Learner {
    @Id
    Long id;

    @Column()
    String firstName;

    @Column()
    String lastName;

    @Column()
    @Email
    String email;

    @Column()
    String phoneNumber;

    @Column()
    String address;

}
