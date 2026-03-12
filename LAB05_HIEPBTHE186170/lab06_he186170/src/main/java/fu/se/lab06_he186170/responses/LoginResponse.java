package fu.se.lab06_he186170.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String token;
    private String expiresIn;
}
