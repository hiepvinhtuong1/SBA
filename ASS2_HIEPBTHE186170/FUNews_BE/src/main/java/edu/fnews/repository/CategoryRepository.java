package edu.fnews.repository;

import edu.fnews.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Short> {

    List<Category> findByIsActive(Boolean isActive);

    List<Category> findByCategoryNameContainingIgnoreCase(String name);

    boolean existsByCategoryNameIgnoreCase(String name);
}
