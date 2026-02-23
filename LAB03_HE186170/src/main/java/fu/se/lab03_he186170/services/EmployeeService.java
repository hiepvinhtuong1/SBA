package fu.se.lab03_he186170.services;

import fu.se.lab03_he186170.entities.Employee;
import fu.se.lab03_he186170.exceptions.ResourceNotFoundException;
import fu.se.lab03_he186170.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<Employee> getAllEmployees(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return employeeRepository.findAll(pageable);
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nhân viên ID " + id + " không tồn tại."));
    }

    public Employee createEmployee(Employee employee) {
        // Logic: Tự động tạo ID nếu empId đang trống (vì dùng String)
        if (employee.getEmpId() == null || employee.getEmpId().isEmpty()) {
            employee.setEmpId(UUID.randomUUID().toString().substring(0, 8));
        }
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(String id, Employee details) {
        Employee existingEmployee = getEmployeeById(id); // Tận dụng check tồn tại

        existingEmployee.setName(details.getName());
        existingEmployee.setDesignation(details.getDesignation());
        existingEmployee.setSalary(details.getSalary());

        return employeeRepository.save(existingEmployee);
    }

    public void deleteEmployee(String id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Xóa thất bại: Không tìm thấy nhân viên ID " + id);
        }
        employeeRepository.deleteById(id);
    }
}