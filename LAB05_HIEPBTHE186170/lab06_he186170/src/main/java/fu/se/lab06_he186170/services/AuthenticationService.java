package fu.se.lab06_he186170.services;

import fu.se.lab06_he186170.dtos.LoginUserDTO;
import fu.se.lab06_he186170.dtos.RegisterUserDTO;
import fu.se.lab06_he186170.entities.User;
import fu.se.lab06_he186170.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User signUp(RegisterUserDTO req){
        var user = User.builder()
                .email(req.getEmail())
                .fullName(req.getFullName())
                .password(passwordEncoder.encode(req.getPassword()))
                .build();
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDTO req){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(),req.getPassword()));
        return userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


}
