package com.example.firstjava.controller;

import com.example.firstjava.dto.ApiResponse;
import com.example.firstjava.service.implement.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.example.firstjava.utils.variable.Constant.LIMIT_DEFAULT;
import static com.example.firstjava.utils.variable.Constant.OFFSET_DEFAULT;

@Slf4j
@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse> getAll(@RequestParam(defaultValue = LIMIT_DEFAULT) Integer limit,
                                              @RequestParam(defaultValue = OFFSET_DEFAULT) Integer offset)
    {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .data(service.getPaginatedList(limit, offset))
                .build());
    }
}
