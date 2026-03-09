package fu.se.lab05_he186170.services;

import fu.se.lab05_he186170.entities.Orchid;
import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid insertOrchid(Orchid orchid);
    Orchid updateOrchid(int orchidID, Orchid orchid);
    void deleteOrchid(int orchid);
    Optional<Orchid> getOrchidByID(int orchidID);
}
