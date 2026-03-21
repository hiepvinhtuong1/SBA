package edu.fnews.service;

import edu.fnews.dto.request.NewsArticleRequest;
import edu.fnews.dto.response.NewsArticleResponse;
import edu.fnews.entity.Category;
import edu.fnews.entity.NewsArticle;
import edu.fnews.entity.SystemAccount;
import edu.fnews.entity.Tag;
import edu.fnews.exception.ResourceNotFoundException;
import edu.fnews.repository.CategoryRepository;
import edu.fnews.repository.NewsArticleRepository;
import edu.fnews.repository.TagRepository;
import edu.fnews.repository.SystemAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsArticleService {

    private final NewsArticleRepository newsArticleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final SystemAccountRepository systemAccountRepository;

    public List<NewsArticleResponse> getAllNews() {
        return newsArticleRepository.findAllByOrderByCreatedDateDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public NewsArticleResponse getNewsById(String id) {
        NewsArticle news = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News article not found with id: " + id));
        return toResponse(news);
    }

    @Transactional
    public NewsArticleResponse createNews(NewsArticleRequest request, Short createdById) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        SystemAccount author = systemAccountRepository.findById(createdById)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + createdById));

        List<Tag> tags = new ArrayList<>();
        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            tags = tagRepository.findAllById(request.getTagIds());
        }

        NewsArticle article = NewsArticle.builder()
                .newsArticleId(UUID.randomUUID().toString().substring(0, 20))
                .newsTitle(request.getNewsTitle())
                .headline(request.getHeadline())
                .newsContent(request.getNewsContent())
                .newsSource(request.getNewsSource())
                .newsStatus(request.getNewsStatus() != null ? request.getNewsStatus() : true)
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .category(category)
                .createdBy(author)
                .updatedBy(author)
                .tags(tags)
                .build();

        NewsArticle saved = newsArticleRepository.save(article);
        return toResponse(saved);
    }

    @Transactional
    public NewsArticleResponse updateNews(String id, NewsArticleRequest request) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News article not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setCategory(category);
        article.setModifiedDate(LocalDateTime.now());

        if (request.getNewsStatus() != null) {
            article.setNewsStatus(request.getNewsStatus());
        }

        if (request.getTagIds() != null) {
            List<Tag> tags = tagRepository.findAllById(request.getTagIds());
            article.setTags(tags);
        }

        NewsArticle saved = newsArticleRepository.save(article);
        return toResponse(saved);
    }

    public void deleteNews(String id) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News article not found with id: " + id));
        newsArticleRepository.delete(article);
    }

    public List<NewsArticleResponse> searchNews(String keyword) {
        return newsArticleRepository.searchByTitle(keyword).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<NewsArticleResponse> getNewsByCategory(Short categoryId) {
        return newsArticleRepository.findByCategory_CategoryId(categoryId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private NewsArticleResponse toResponse(NewsArticle article) {
        List<NewsArticleResponse.TagResponse> tagResponses = new ArrayList<>();
        if (article.getTags() != null) {
            tagResponses = article.getTags().stream()
                    .map(t -> NewsArticleResponse.TagResponse.builder()
                            .tagId(t.getTagId())
                            .tagName(t.getTagName())
                            .build())
                    .collect(Collectors.toList());
        }

        return NewsArticleResponse.builder()
                .newsArticleId(article.getNewsArticleId())
                .newsTitle(article.getNewsTitle())
                .headline(article.getHeadline())
                .newsContent(article.getNewsContent())
                .createdDate(article.getCreatedDate())
                .modifiedDate(article.getModifiedDate())
                .newsStatus(article.getNewsStatus())
                .newsSource(article.getNewsSource())
                .categoryId(article.getCategory() != null ? article.getCategory().getCategoryId() : null)
                .categoryName(article.getCategory() != null ? article.getCategory().getCategoryName() : null)
                .createdById(article.getCreatedBy() != null ? article.getCreatedBy().getAccountId() : null)
                .createdByName(article.getCreatedBy() != null ? article.getCreatedBy().getAccountName() : null)
                .updatedById(article.getUpdatedBy() != null ? article.getUpdatedBy().getAccountId() : null)
                .updatedByName(article.getUpdatedBy() != null ? article.getUpdatedBy().getAccountName() : null)
                .tags(tagResponses)
                .build();
    }
}
