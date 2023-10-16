package com.example.firstjava.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Courses")
public class Course {
    @Id
    Long id;

    @Column()
    String courseName;

    @Column()
    String courseDescription;

    @Column()
    Date startDate;

    @Column()
    Date endDate;

    @Column()
    Double price;

    @Column()
    Double duration;

    @Column()
    Double averageStars;

    @Column()
    int ratings;

    @Column()
    byte[] thumbnail;

    @Column()
    String level;

    @JoinColumn()
    @ManyToOne
    Mentor mentor;
}
