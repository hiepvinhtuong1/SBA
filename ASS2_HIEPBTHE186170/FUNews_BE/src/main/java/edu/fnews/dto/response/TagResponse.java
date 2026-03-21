package edu.fnews.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagResponse {
    private Integer tagId;
    private String tagName;
    private String tagNote;
}
