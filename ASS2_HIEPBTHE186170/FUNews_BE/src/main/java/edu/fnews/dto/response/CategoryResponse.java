package edu.fnews.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {
    private Short categoryId;
    private String categoryName;
    private String categoryDescription;
    private Short parentId;
    private Boolean isActive;
    private Long newsCount;
}
