package edu.fnews.controller;

import edu.fnews.dto.request.NewsArticleRequest;
import edu.fnews.dto.response.NewsArticleResponse;
import edu.fnews.entity.SystemAccount;
import edu.fnews.service.NewsArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsArticleController {

    private final NewsArticleService newsArticleService;
    private final edu.fnews.repository.SystemAccountRepository accountRepository;

    @GetMapping
    public ResponseEntity<List<NewsArticleResponse>> getAllNews() {
        return ResponseEntity.ok(newsArticleService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticleResponse> getNewsById(@PathVariable String id) {
        return ResponseEntity.ok(newsArticleService.getNewsById(id));
    }

    @PostMapping
    public ResponseEntity<NewsArticleResponse> createNews(
            @Valid @RequestBody NewsArticleRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        SystemAccount account = accountRepository.findByAccountEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(newsArticleService.createNews(request, account.getAccountId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsArticleResponse> updateNews(
            @PathVariable String id,
            @Valid @RequestBody NewsArticleRequest request) {
        return ResponseEntity.ok(newsArticleService.updateNews(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable String id) {
        newsArticleService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<NewsArticleResponse>> searchNews(@RequestParam String keyword) {
        return ResponseEntity.ok(newsArticleService.searchNews(keyword));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<NewsArticleResponse>> getNewsByCategory(@PathVariable Short categoryId) {
        return ResponseEntity.ok(newsArticleService.getNewsByCategory(categoryId));
    }
}
