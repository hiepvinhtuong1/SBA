package edu.fnews.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Short categoryId;

    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "CategoryDesciption", nullable = false, length = 250)
    private String categoryDescription;

    @Column(name = "ParentCategoryID")
    private Short parentId;

    @Column(name = "IsActive")
    private Boolean isActive;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<NewsArticle> newsArticles;
}
