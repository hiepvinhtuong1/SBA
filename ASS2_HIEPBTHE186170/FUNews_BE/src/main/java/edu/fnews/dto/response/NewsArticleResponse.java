package edu.fnews.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsArticleResponse {
    private String newsArticleId;
    private String newsTitle;
    private String headline;
    private String newsContent;
    private LocalDateTime createdDate;
    private Boolean newsStatus;
    private String newsSource;

    private Short categoryId;
    private String categoryName;

    private Short createdById;
    private String createdByName;

    private Short updatedById;
    private String updatedByName;
    private LocalDateTime modifiedDate;

    private List<TagResponse> tags;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TagResponse {
        private Integer tagId;
        private String tagName;
    }
}
