package com.example.firstjava.utils.seeder;

import com.example.firstjava.entity.Course;
import com.example.firstjava.entity.Learner;
import com.example.firstjava.entity.PurchasedCourse;
import com.example.firstjava.entity.Video;
import com.example.firstjava.repository.CourseRepository;
import com.example.firstjava.repository.LearnerRepository;
import com.example.firstjava.repository.PurchasedCourseRepository;
import com.example.firstjava.repository.VideoRepository;
import com.example.firstjava.utils.helper.Helper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class DataSeeder {
    //prepare dependencies
    private static final Logger _logger = LoggerFactory.getLogger(DataSeeder.class);
    private final PurchasedCourseRepository _purchasedCourseRepository;
    private final CourseRepository _courseRepository;
    private final LearnerRepository _learnerRepository;
    private final VideoRepository _videoRepository;
    private final JdbcTemplate _jdbcTemplate;

    //<editor-fold desc="prepare ids">
    private static final Long VIDEO_1_ID = Helper.GenerateLongUID();
    private static final Long VIDEO_2_ID = Helper.GenerateLongUID();
    private static final Long VIDEO_3_ID = Helper.GenerateLongUID();

    private static final Long COURSE_1_ID = Helper.GenerateLongUID();
    private static final Long COURSE_2_ID = Helper.GenerateLongUID();
    private static final Long COURSE_3_ID = Helper.GenerateLongUID();

    private static final Long LEARNER_1_ID = Helper.GenerateLongUID();
    private static final Long LEARNER_2_ID = Helper.GenerateLongUID();

    private static final Long PURCHASED_COURSE_1_ID = Helper.GenerateLongUID();
    private static final Long PURCHASED_COURSE_2_ID = Helper.GenerateLongUID();
    private static final Long PURCHASED_COURSE_3_ID = Helper.GenerateLongUID();
    //</editor-fold>

    @Autowired
    public DataSeeder(
            JdbcTemplate jdbcTemplate,
            CourseRepository courseRepository,
            LearnerRepository learnerRepository,
            VideoRepository videoRepository,
            PurchasedCourseRepository purchasedCourseRepository
    ){
        _jdbcTemplate = jdbcTemplate;
        _courseRepository = courseRepository;
        _learnerRepository = learnerRepository;
        _videoRepository = videoRepository;
        _purchasedCourseRepository = purchasedCourseRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedLearnerTable();
        seedVideosCourses();
        seedPurchasedCourses();
    }

    private void seedVideosCourses(){
        String videoSql = "SELECT id FROM videos LIMIT 1";
        String courseSql = "SELECT id FROM courses LIMIT 1";

        List<Video> videoRs = _jdbcTemplate.query(videoSql, (resultSet, rowNum) -> null);
        List<Course> courseRs = _jdbcTemplate.query(courseSql, (resultSet, rowNum) -> null);

        if(!videoRs.isEmpty() || !courseRs.isEmpty()) {
            _logger.info("courses and videos seeding ignored");
            return;
        }

        //videos
        Video v1 = new Video();
        Video v2 = new Video();
        Video v3 = new Video();

        v1.setId(VIDEO_1_ID);
        v1.setLink("video1.com");
        v1.setName("video1");

        v2.setId(VIDEO_2_ID);
        v2.setLink("video2.com");
        v2.setName("video2");

        v3.setId(VIDEO_3_ID);
        v3.setLink("video3.com");
        v3.setName("video3");

        //course
        Course c1 = new Course();
        Course c2 = new Course();
        Course c3 = new Course();

        c1.setId(COURSE_1_ID);
        c1.setCourseName("Build Responsive Real- World Websites with HTML and CSS");
        c1.setAverageStars(5.0);
        c1.setRatings(12);

        c2.setId(COURSE_2_ID);
        c2.setCourseName("Java Programming Masterclass for Software Developers");
        c2.setAverageStars(4.4);

        c3.setId(COURSE_3_ID);
        c3.setCourseName("The Complete Camtasia Course for Content Creators");
        c3.setAverageStars(4.9);

        //relationships
        v1.setCourse(c1);
        v2.setCourse(c2);
        v3.setCourse(c3);

        //DDL
        _videoRepository.saveAll(Arrays.asList(v1, v2, v3));
        _courseRepository.saveAll(Arrays.asList(c1, c2, c3));

        _logger.info("courses and videos seeded");
    }

    private void seedLearnerTable(){
        String sql = "SELECT id FROM learners LIMIT 1";
        List<Learner> rs = _jdbcTemplate.query(sql, (resultSet, rowNum) -> null);

        if(rs.isEmpty()) {
            Learner l1 = new Learner();
            Learner l2 = new Learner();

            l1.setId(LEARNER_1_ID);
            l1.setFirstName("L1");
            l1.setLastName("Learner");

            l2.setId(LEARNER_2_ID);
            l2.setFirstName("L2");
            l2.setLastName("Learner");

            _learnerRepository.saveAll(Arrays.asList(l1, l2));
            _logger.info("learners table seeded");
        } else {
            _logger.info("learners seeding ignored.");
        }
    }

    private void seedPurchasedCourses(){
        String sql = "SELECT id FROM purchased_courses LIMIT 1";
        List<PurchasedCourse> rs = _jdbcTemplate.query(sql, (resultSet, rowNum) -> null);

        if(rs.isEmpty()) {
            PurchasedCourse c1 = new PurchasedCourse();
            PurchasedCourse c2 = new PurchasedCourse();
            PurchasedCourse c3 = new PurchasedCourse();

            c1.setId(PURCHASED_COURSE_1_ID);
            c1.setCourseId(COURSE_1_ID);
            c1.setLearnerId(LEARNER_1_ID);
            c1.setIsExpired(false);

            c2.setId(PURCHASED_COURSE_2_ID);
            c2.setCourseId(COURSE_2_ID);
            c2.setLearnerId(LEARNER_1_ID);
            c2.setIsExpired(false);

            c3.setId(PURCHASED_COURSE_3_ID);
            c3.setCourseId(COURSE_3_ID);
            c3.setLearnerId(LEARNER_1_ID);
            c3.setIsExpired(false);

            _purchasedCourseRepository.saveAll(Arrays.asList(c1, c2, c3));
            _logger.info("purchased table seeded");
        } else {
            _logger.info("purchased courses seeding ignored");
        }
    }
}
