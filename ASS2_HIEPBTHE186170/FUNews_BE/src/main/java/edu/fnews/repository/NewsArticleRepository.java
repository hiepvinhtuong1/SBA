package edu.fnews.repository;

import edu.fnews.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, String> {

    List<NewsArticle> findByNewsStatus(Boolean status);

    List<NewsArticle> findByCategory_CategoryId(Short categoryId);

    List<NewsArticle> findByCreatedBy_AccountId(Short accountId);

    @Query("SELECT n FROM NewsArticle n WHERE LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<NewsArticle> searchByTitle(@Param("keyword") String keyword);

    List<NewsArticle> findAllByOrderByCreatedDateDesc();
}
