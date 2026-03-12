package fu.se.lab06_he186170.responses;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
    private Integer id;
    private String fullName;
    private String email;
}
