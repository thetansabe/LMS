package com.example.firstjava.service.interfaces;

import com.example.firstjava.entity.Course;
import org.springframework.data.domain.Page;

public interface CourseService {
    public Page<Course> getPaginatedList(Integer limit, Integer offset);
}
