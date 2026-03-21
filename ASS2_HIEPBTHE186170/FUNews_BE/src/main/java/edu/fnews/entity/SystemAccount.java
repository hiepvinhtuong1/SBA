package edu.fnews.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "SystemAccount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private Short accountId;

    @Column(name = "AccountName", length = 100)
    private String accountName;

    @Column(name = "AccountEmail", unique = true, nullable = false, length = 70)
    private String accountEmail;

    @Column(name = "AccountRole")
    private Integer role; // Admin = 1, Staff = 2

    @Column(name = "AccountPassword", nullable = false, length = 70)
    private String accountPassword;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<NewsArticle> newsArticles;
}
