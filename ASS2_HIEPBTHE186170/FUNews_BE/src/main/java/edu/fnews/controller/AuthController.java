package edu.fnews.controller;

import edu.fnews.dto.request.LoginRequest;
import edu.fnews.dto.request.RegisterRequest;
import edu.fnews.dto.response.AccountResponse;
import edu.fnews.dto.response.AuthResponse;
import edu.fnews.entity.SystemAccount;
import edu.fnews.exception.DuplicateResourceException;
import edu.fnews.repository.SystemAccountRepository;
import edu.fnews.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final SystemAccountRepository accountRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        SystemAccount account = accountRepository.findByAccountEmail(request.getEmail())
                .orElseThrow();

        AccountResponse accountResponse = AccountResponse.builder()
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountEmail(account.getAccountEmail())
                .role(account.getRole())
                .build();

        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .user(accountResponse)
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (accountRepository.existsByAccountEmail(request.getAccountEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getAccountEmail());
        }

        SystemAccount account = SystemAccount.builder()
                .accountName(request.getAccountName())
                .accountEmail(request.getAccountEmail())
                .accountPassword(request.getAccountPassword())
                .role(2) // Staff by default
                .build();

        SystemAccount saved = accountRepository.save(account);

        UserDetails userDetails = userDetailsService.loadUserByUsername(saved.getAccountEmail());
        String token = jwtUtil.generateToken(userDetails);

        AccountResponse accountResponse = AccountResponse.builder()
                .accountId(saved.getAccountId())
                .accountName(saved.getAccountName())
                .accountEmail(saved.getAccountEmail())
                .role(saved.getRole())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(AuthResponse.builder()
                        .token(token)
                        .user(accountResponse)
                        .build());
    }
}
