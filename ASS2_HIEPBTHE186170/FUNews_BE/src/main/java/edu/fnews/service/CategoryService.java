package edu.fnews.service;

import edu.fnews.dto.request.CategoryRequest;
import edu.fnews.dto.response.CategoryResponse;
import edu.fnews.entity.Category;
import edu.fnews.exception.DuplicateResourceException;
import edu.fnews.exception.ResourceNotFoundException;
import edu.fnews.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Short id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return toResponse(category);
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByCategoryNameIgnoreCase(request.getCategoryName())) {
            throw new DuplicateResourceException("Category already exists: " + request.getCategoryName());
        }
        Category category = Category.builder()
                .categoryName(request.getCategoryName())
                .categoryDescription(request.getCategoryDescription())
                .parentId(request.getParentId())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
        Category saved = categoryRepository.save(category);
        return toResponse(saved);
    }

    public CategoryResponse updateCategory(Short id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDescription());
        category.setParentId(request.getParentId());
        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }
        Category saved = categoryRepository.save(category);
        return toResponse(saved);
    }

    public void deleteCategory(Short id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(category);
    }

    public List<CategoryResponse> searchCategories(String keyword) {
        return categoryRepository.findByCategoryNameContainingIgnoreCase(keyword).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryDescription(category.getCategoryDescription())
                .parentId(category.getParentId())
                .isActive(category.getIsActive())
                .newsCount(category.getNewsArticles() != null ? (long) category.getNewsArticles().size() : 0L)
                .build();
    }
}
