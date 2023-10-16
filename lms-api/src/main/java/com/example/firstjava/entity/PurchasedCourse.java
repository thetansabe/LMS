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
@Table(
        name = "PurchasedCourses",
        indexes = {
                @Index(name = "mult_id", columnList = "courseId, learnerId", unique = true)
        }
)
public class PurchasedCourse {
    @Id
    Long id;

    @Column()
    Long courseId;

    @Column()
    Long learnerId;

    @Column()
    Date boughtDate;

    @Column()
    Date expiredDate;

    @Column()
    Boolean isExpired;

    @Column()
    Double originalPrice;

    @Column()
    Double boughtPrice;
}
