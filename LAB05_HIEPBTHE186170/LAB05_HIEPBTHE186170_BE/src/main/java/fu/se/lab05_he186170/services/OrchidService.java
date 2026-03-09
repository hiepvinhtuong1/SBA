package fu.se.lab05_he186170.services;

import fu.se.lab05_he186170.entities.Orchid;
import fu.se.lab05_he186170.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository orchidRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        if (orchidRepository.existsById(orchidID)) {
            orchid.setId(orchidID);
            return orchidRepository.save(orchid);
        }
        return null;
    }

    @Override
    public void deleteOrchid(int orchidID) {
        if (orchidRepository.existsById(orchidID)) {
            orchidRepository.deleteById(orchidID);
        }
    }

    @Override
    public Optional<Orchid> getOrchidByID(int orchidID) {
        return orchidRepository.findById(orchidID);
    }
}
