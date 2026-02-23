package fu.se.lab03_he186170.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employees") // Nên đặt tên table rõ ràng, tránh trùng từ khóa hệ thống
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder // <--- Thêm cái này cực kỳ hữu ích khi viết Test
public class Employee {

    @Id
    // Nếu bạn muốn ID tự sinh thì thêm @GeneratedValue,
    // còn nếu nhập tay (ví dụ: E01, E02) thì giữ nguyên như bạn.
    private String empId;

    @NotBlank(message = "Tên nhân viên không được để trống")
    private String name;

    @NotBlank(message = "Chức vụ không được để trống")
    private String designation;

    @Min(value = 0, message = "Lương không được là số âm")
    private double salary;
}
