package edu.fnews.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Tag")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TagID")
    private Integer tagId;

    @Column(name = "TagName", length = 50)
    private String tagName;

    @Column(name = "Note", length = 400)
    private String tagNote;

    @ManyToMany(mappedBy = "tags")
    private List<NewsArticle> newsArticles;
}
