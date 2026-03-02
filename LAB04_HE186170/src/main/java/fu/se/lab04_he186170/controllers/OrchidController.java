package fu.se.lab04_he186170.controllers;


import fu.se.lab04_he186170.dto.ApiBaseResponse;
import fu.se.lab04_he186170.dto.OrchidRequest;
import fu.se.lab04_he186170.dto.OrchidResponse;
import fu.se.lab04_he186170.services.OrchidService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class OrchidController {
    OrchidService orchidService;

    @PostMapping
    public ApiBaseResponse<OrchidResponse> createOrchid(@RequestBody OrchidRequest request) {
        return ApiBaseResponse.<OrchidResponse>builder().result(orchidService.createOrchid(request)).build();
    }

    @GetMapping
    public ApiBaseResponse<List<OrchidResponse>> getAllOrchids() {
        return ApiBaseResponse.<List<OrchidResponse>>builder().result(orchidService.getAllOrchids()).build();
    }

    @GetMapping("/{id}")
    public ApiBaseResponse<OrchidResponse> getOrchid(@PathVariable("id") int id) {
        return ApiBaseResponse.<OrchidResponse>builder().result(orchidService.getOrchid(id)).build();
    }

    @PutMapping("/{id}")
    public ApiBaseResponse<OrchidResponse> updateOrchid(@PathVariable("id") int id, @RequestBody OrchidRequest request) {
        return ApiBaseResponse.<OrchidResponse>builder().result(orchidService.updateOrchid(id, request)).build();
    }

    @DeleteMapping("/{id}")
    public ApiBaseResponse<String> deleteOrchid(@PathVariable("id") int id) {
        orchidService.deleteOrchid(id);
        return ApiBaseResponse.<String>builder().result("Orchid has been deleted successfully").build();
    }
}