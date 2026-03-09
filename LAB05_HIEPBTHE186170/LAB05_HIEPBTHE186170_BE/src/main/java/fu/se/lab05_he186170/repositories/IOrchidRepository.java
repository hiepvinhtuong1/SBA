package fu.se.lab05_he186170.repositories;

import fu.se.lab05_he186170.entities.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
