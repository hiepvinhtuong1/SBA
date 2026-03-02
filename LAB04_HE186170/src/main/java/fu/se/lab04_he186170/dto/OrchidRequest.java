package fu.se.lab04_he186170.dto;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrchidRequest {
    String orchidName;
    boolean isNatural;
    String orchidDescription;
    String orchidCategory;
    boolean isAttractive;
    String orchidURL;
}
