package edu.fnews.service;

import edu.fnews.dto.request.AccountRequest;
import edu.fnews.dto.response.AccountResponse;
import edu.fnews.entity.SystemAccount;
import edu.fnews.exception.DuplicateResourceException;
import edu.fnews.exception.ResourceNotFoundException;
import edu.fnews.repository.SystemAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final SystemAccountRepository accountRepository;

    public List<AccountResponse> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AccountResponse getAccountById(Short id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        return toResponse(account);
    }

    public AccountResponse createAccount(AccountRequest request) {
        if (accountRepository.existsByAccountEmail(request.getAccountEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getAccountEmail());
        }
        
        SystemAccount account = SystemAccount.builder()
                .accountName(request.getAccountName())
                .accountEmail(request.getAccountEmail())
                .accountPassword(request.getAccountPassword())
                .role(request.getRole() != null ? request.getRole() : 2) // Default: Staff
                .build();
        SystemAccount saved = accountRepository.save(account);
        return toResponse(saved);
    }

    public AccountResponse updateAccount(Short id, AccountRequest request) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        if (request.getAccountPassword() != null && !request.getAccountPassword().isBlank()) {
            account.setAccountPassword(request.getAccountPassword());
        }
        if (request.getRole() != null) {
            account.setRole(request.getRole());
        }
        SystemAccount saved = accountRepository.save(account);
        return toResponse(saved);
    }

    public void deleteAccount(Short id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
        accountRepository.delete(account);
    }

    private AccountResponse toResponse(SystemAccount account) {
        return AccountResponse.builder()
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountEmail(account.getAccountEmail())
                .role(account.getRole())
                .build();
    }
}
