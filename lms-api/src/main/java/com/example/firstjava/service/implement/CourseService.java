package com.example.firstjava.service.implement;

import com.example.firstjava.entity.Course;
import com.example.firstjava.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CourseService implements com.example.firstjava.service.interfaces.CourseService {
    @Autowired
    private CourseRepository repository;

    @Override
    public Page<Course> getPaginatedList(Integer limit, Integer offset){
        if (limit < 0 || offset < 0 || offset > 1000) {
            throw new IllegalArgumentException("Page limit and offset must be positive");
        }

        PageRequest pageRequest = PageRequest.of(offset, limit);

        return repository.findAll(pageRequest);
    }
}
