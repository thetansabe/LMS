package com.example.firstjava.repository;

import com.example.firstjava.entity.PurchasedCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedCourseRepository extends JpaRepository<PurchasedCourse, Long> {

}
