package fu.se.lab05_he186170.controllers;

import fu.se.lab05_he186170.entities.Orchid;
import fu.se.lab05_he186170.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private IOrchidService orchidService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        List<Orchid> orchids = orchidService.getAllOrchids();
        return new ResponseEntity<>(orchids, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidByID(@PathVariable("id") int id) {
        Optional<Orchid> orchid = orchidService.getOrchidByID(id);
        if (orchid.isPresent()) {
            return new ResponseEntity<>(orchid.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<Orchid> createOrchid(@RequestBody Orchid orchid) {
        Orchid savedOrchid = orchidService.insertOrchid(orchid);
        return new ResponseEntity<>(savedOrchid, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable("id") int id, @RequestBody Orchid orchid) {
        Orchid updatedOrchid = orchidService.updateOrchid(id, orchid);
        if (updatedOrchid != null) {
            return new ResponseEntity<>(updatedOrchid, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable("id") int id) {
        if (orchidService.getOrchidByID(id).isPresent()) {
            orchidService.deleteOrchid(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Or OK, but NO_CONTENT is standard for DELETE
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
