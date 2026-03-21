package edu.fnews.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsArticleRequest {

    @NotBlank(message = "News title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String newsTitle;

    @NotBlank(message = "Headline is required")
    @Size(max = 150, message = "Headline must not exceed 150 characters")
    private String headline;

    @NotBlank(message = "News content is required")
    private String newsContent;

    private String newsSource;

    private Boolean newsStatus;

    @NotNull(message = "Category is required")
    private Short categoryId;

    private List<Integer> tagIds;
}
