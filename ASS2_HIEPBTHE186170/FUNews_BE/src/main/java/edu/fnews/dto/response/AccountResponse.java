package edu.fnews.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse {
    private Short accountId;
    private String accountName;
    private String accountEmail;
    private Integer role;
}
