package fu.se.lab04_he186170.repositories;

import fu.se.lab04_he186170.entities.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
