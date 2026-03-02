package fu.se.lab04_he186170.services;

import fu.se.lab04_he186170.dto.OrchidRequest;
import fu.se.lab04_he186170.dto.OrchidResponse;
import fu.se.lab04_he186170.entities.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {

    OrchidResponse createOrchid(OrchidRequest request);

    OrchidResponse getOrchid(int id);

    List<OrchidResponse> getAllOrchids();

    OrchidResponse updateOrchid(int id, OrchidRequest request);

    void deleteOrchid(int id);

}