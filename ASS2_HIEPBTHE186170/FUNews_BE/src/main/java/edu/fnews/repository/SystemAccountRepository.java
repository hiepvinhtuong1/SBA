package edu.fnews.repository;

import edu.fnews.entity.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Short> {

    Optional<SystemAccount> findByAccountEmail(String email);

    boolean existsByAccountEmail(String email);

    @Query("SELECT MAX(s.accountId) FROM SystemAccount s")
    Optional<Short> findMaxAccountId();
}
