package edu.fnews.repository;

import edu.fnews.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

    List<Tag> findByTagNameContainingIgnoreCase(String name);

    boolean existsByTagNameIgnoreCase(String name);
}
