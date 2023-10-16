package com.example.firstjava.repository;

import com.example.firstjava.entity.Learner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Long> {
    //getInfo

    //create

    //edit

    //delete
}
