package edu.fnews.security;

import edu.fnews.entity.SystemAccount;
import edu.fnews.repository.SystemAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final SystemAccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        SystemAccount account = accountRepository.findByAccountEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        String roleName = account.getRole() == 1 ? "ROLE_ADMIN" : "ROLE_STAFF";

        return new User(
                account.getAccountEmail(),
                account.getAccountPassword(),
                List.of(new SimpleGrantedAuthority(roleName))
        );
    }
}
