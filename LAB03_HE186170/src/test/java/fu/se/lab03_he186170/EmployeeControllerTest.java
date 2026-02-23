package fu.se.lab03_he186170;


import com.fasterxml.jackson.databind.ObjectMapper;
import fu.se.lab03_he186170.controllers.EmployeeController;
import fu.se.lab03_he186170.entities.Employee;
import fu.se.lab03_he186170.services.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    private ObjectMapper objectMapper;

    private Employee sampleEmployee;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        // Chuẩn bị dữ liệu mẫu trước mỗi bài test
        sampleEmployee = new Employee("EMP001", "Nguyen Van A", "Developer", 1500.0);
    }

    @Test
    @DisplayName("GET /api/employees - Trả về danh sách phân trang")
    void getAll_ShouldReturnPageOfEmployees() throws Exception {
        Page<Employee> page = new PageImpl<>(List.of(sampleEmployee));

        when(employeeService.getAllEmployees(0, 10)).thenReturn(page);

        mockMvc.perform(get("/api/employees")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].empId").value("EMP001"))
                .andExpect(jsonPath("$.content[0].name").value("Nguyen Van A"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    @DisplayName("GET /api/employees/{id} - Tìm thấy nhân viên")
    void getById_ExistingId_ShouldReturnEmployee() throws Exception {
        when(employeeService.getEmployeeById("EMP001")).thenReturn(sampleEmployee);

        mockMvc.perform(get("/api/employees/EMP001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.empId").value("EMP001"))
                .andExpect(jsonPath("$.name").value("Nguyen Van A"));
    }

    @Test
    @DisplayName("POST /api/employees - Tạo thành công")
    void create_ValidEmployee_ShouldReturnCreated() throws Exception {
        when(employeeService.createEmployee(any(Employee.class))).thenReturn(sampleEmployee);

        mockMvc.perform(post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleEmployee)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.empId").value("EMP001"))
                .andExpect(jsonPath("$.designation").value("Developer"));
    }

    @Test
    @DisplayName("POST /api/employees - Lỗi Validation (Tên trống, Lương âm)")
    void create_InvalidEmployee_ShouldReturnBadRequest() throws Exception {
        // Employee vi phạm @NotBlank và @Min
        Employee invalidEmp = new Employee("ERR", "", "", -500.0);

        mockMvc.perform(post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidEmp)))
                .andExpect(status().isBadRequest()); // Spring tự trả về 400 do @Valid

        // Đảm bảo service không bao giờ được gọi khi dữ liệu lỗi
        verify(employeeService, times(0)).createEmployee(any());
    }

    @Test
    @DisplayName("DELETE /api/employees/{id} - Xóa thành công")
    void delete_ExistingId_ShouldReturnSuccessMessage() throws Exception {
        String id = "EMP001";
        doNothing().when(employeeService).deleteEmployee(id);

        mockMvc.perform(delete("/api/employees/{id}", id))
                .andExpect(status().isOk())
                .andExpect(content().string("Đã xóa nhân viên thành công."));

        verify(employeeService, times(1)).deleteEmployee(id);
    }
}
