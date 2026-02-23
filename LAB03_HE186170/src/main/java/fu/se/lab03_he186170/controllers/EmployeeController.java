package fu.se.lab03_he186170.controllers;

import fu.se.lab03_he186170.entities.Employee;
import fu.se.lab03_he186170.services.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // GET: http://localhost:8080/api/employees?page=0&size=5
    @GetMapping
    public ResponseEntity<Page<Employee>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(employeeService.getAllEmployees(page, size));
    }

    // GET: http://localhost:8080/api/employees/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable String id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    // POST: http://localhost:8080/api/employees
    @PostMapping
    public ResponseEntity<Employee> create(@Valid @RequestBody Employee employee) {
        Employee created = employeeService.createEmployee(employee);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // DELETE: http://localhost:8080/api/employees/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Đã xóa nhân viên thành công.");
    }
}