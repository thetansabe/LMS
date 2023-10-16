package com.example.firstjava.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Videos")
public class Video {
    @Id
    Long id;

    @Column()
    String name;

    @Column()
    String link;

    @JoinColumn()
    @ManyToOne(cascade = CascadeType.ALL)
    Course course;
}
