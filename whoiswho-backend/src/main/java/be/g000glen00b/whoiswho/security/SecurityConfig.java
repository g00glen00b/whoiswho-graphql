package be.g000glen00b.whoiswho.security;

import be.g000glen00b.whoiswho.user.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {
    @Bean
    public Algorithm jwtAlgorithm(SecurityProperties properties) {
        return Algorithm.HMAC256(properties.getTokenSecret());
    }

    @Bean
    public JWTVerifier verifier(SecurityProperties properties, Algorithm algorithm) {
        return JWT
            .require(algorithm)
            .withIssuer(properties.getTokenIssuer())
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(SecurityProperties properties) {
        return new BCryptPasswordEncoder(properties.getPasswordStrength());
    }


    @Bean
    public AuthenticationProvider authenticationProvider(UserService userService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }
}
