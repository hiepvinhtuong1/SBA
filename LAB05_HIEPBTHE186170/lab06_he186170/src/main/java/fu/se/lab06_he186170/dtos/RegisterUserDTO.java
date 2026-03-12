package fu.se.lab06_he186170.dtos;

import lombok.Data;

@Data
public class RegisterUserDTO {
    private String email;
    private String password;
    private String fullName;
}
