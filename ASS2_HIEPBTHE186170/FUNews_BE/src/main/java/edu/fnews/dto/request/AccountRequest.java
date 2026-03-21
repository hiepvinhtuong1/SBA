package edu.fnews.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountRequest {

    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String accountName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String accountEmail;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String accountPassword;

    private Integer role; // 1 = Admin, 2 = Staff
}
