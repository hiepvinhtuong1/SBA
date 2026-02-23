package fu.se.lab03_he186170;

import fu.se.lab03_he186170.entities.Employee;
import fu.se.lab03_he186170.exceptions.ResourceNotFoundException;
import fu.se.lab03_he186170.repositories.EmployeeRepository;
import fu.se.lab03_he186170.services.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {
    @Mock
    private EmployeeRepository employeeRepository; // Giả lập Repository

    @InjectMocks
    private EmployeeService employeeService; // Bơm Mock Repository vào Service này

    private Employee sampleEmployee;

    @BeforeEach
    void setUp() {
        sampleEmployee = new Employee("EMP001", "Hiep", "Dev", 2000.0);
    }
    @Test
    void getEmployeeById_WhenExists_ShouldReturnEmployee() {
        // Arrange
        when(employeeRepository.findById("EMP001")).thenReturn(Optional.of(sampleEmployee));

        // Act
        Employee result = employeeService.getEmployeeById("EMP001");

        // Assert
        assertEquals("Hiep", result.getName());
        assertEquals("EMP001", result.getEmpId());
    }

    @Test
    void getEmployeeById_WhenNotFound_ShouldThrowException() {
        // Arrange
        when(employeeRepository.findById("NONE")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            employeeService.getEmployeeById("NONE");
        });
    }

    @Test
    void createEmployee_WithNoId_ShouldGenerateId() {
        // Arrange
        Employee newEmp = new Employee(null, "Newbie", "Intern", 500.0);
        // Giả lập lưu thành công và trả về chính object đó
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Employee saved = employeeService.createEmployee(newEmp);

        // Assert
        assertNotNull(saved.getEmpId()); // Kiểm tra ID đã được sinh ra
        assertEquals(8, saved.getEmpId().length()); // Kiểm tra độ dài substring(0,8)
        verify(employeeRepository, times(1)).save(any());
    }

    @Test
    void updateEmployee_ShouldReturnUpdatedEmployee() {
        // Arrange
        Employee updateDetails = new Employee(null, "Hiep Updated", "Senior Dev", 3000.0);
        when(employeeRepository.findById("EMP001")).thenReturn(Optional.of(sampleEmployee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(sampleEmployee);

        // Act
        Employee result = employeeService.updateEmployee("EMP001", updateDetails);

        // Assert
        assertEquals("Hiep Updated", result.getName());
        assertEquals(3000.0, result.getSalary());
    }

    @Test
    void deleteEmployee_WhenExists_ShouldCallDelete() {
        // Arrange
        when(employeeRepository.existsById("EMP001")).thenReturn(true);

        // Act
        employeeService.deleteEmployee("EMP001");

        // Assert
        verify(employeeRepository, times(1)).deleteById("EMP001");
    }

    @Test
    void deleteEmployee_WhenNotExists_ShouldThrowException() {
        // Arrange
        when(employeeRepository.existsById("NONE")).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            employeeService.deleteEmployee("NONE");
        });
        // Đảm bảo hàm deleteById không bao giờ được gọi
        verify(employeeRepository, never()).deleteById(any());
    }
}
