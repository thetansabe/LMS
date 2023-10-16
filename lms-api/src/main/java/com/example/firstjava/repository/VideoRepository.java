package com.example.firstjava.repository;

import com.example.firstjava.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    //getVideosByCourseId

    //getVideoById

    //create

    //edit

    //delete
}
