package be.g000glen00b.whoiswho.user;

import be.g000glen00b.whoiswho.person.Person;
import be.g000glen00b.whoiswho.person.PersonService;
import be.g000glen00b.whoiswho.security.BadCredentialsException;
import be.g000glen00b.whoiswho.security.BadTokenException;
import be.g000glen00b.whoiswho.security.JWTUserDetails;
import be.g000glen00b.whoiswho.security.SecurityProperties;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;
import static java.util.function.Predicate.not;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private static final String ADMIN_AUTHORITY = "ADMIN";
    private static final String USER_AUTHORITY = "USER";
    private final UserRepository repository;
    private final PersonService personService;
    private final SecurityProperties properties;
    private final Algorithm algorithm;
    private final JWTVerifier verifier;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public JWTUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository
            .findByEmail(email)
            .map(user -> getUserDetails(user, getToken(user)))
            .orElseThrow(() -> new UsernameNotFoundException("Username or password didn''t match"));
    }

    @Transactional
    public JWTUserDetails loadUserByToken(String token) {
        return getDecodedToken(token)
            .map(DecodedJWT::getSubject)
            .flatMap(repository::findByEmail)
            .map(user -> getUserDetails(user, token))
            .orElseThrow(BadTokenException::new);
    }

    @Transactional
    public User getCurrentUser() {
        return Optional
            .ofNullable(SecurityContextHolder.getContext())
            .map(SecurityContext::getAuthentication)
            .map(Authentication::getName)
            .flatMap(repository::findByEmail)
            .orElse(null);
    }

    @Transactional
    public User createUser(Person person, CreateUserInput input) {
        if (!exists(input)) {
            return repository.saveAndFlush(User
                .builder()
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .roles(Set.of(USER_AUTHORITY))
                .personId(person.getId())
                .person(person)
                .build());
        } else {
            throw new UserAlreadyExistsException(input.getEmail());
        }
    }

    @Transactional
    public User updatePassword(Long personId, UpdatePasswordInput input) {
        User user = repository.findById(personId).orElseThrow(() -> new UserNotFoundException(personId));
        if (passwordEncoder.matches(input.getOriginalPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(input.getNewPassword()));
        } else {
            throw new BadCredentialsException(user.getEmail());
        }
        return user;
    }

    @Transactional
    public String getToken(User user) {
        Instant now = Instant.now();
        Instant expiry = Instant.now().plus(properties.getTokenExpiration());
        return JWT
            .create()
            .withIssuer(properties.getTokenIssuer())
            .withIssuedAt(Date.from(now))
            .withExpiresAt(Date.from(expiry))
            .withSubject(user.getEmail())
            .sign(algorithm);
    }

    public boolean isAdmin() {
        return Optional
            .ofNullable(SecurityContextHolder.getContext())
            .map(SecurityContext::getAuthentication)
            .map(Authentication::getAuthorities)
            .stream()
            .flatMap(Collection::stream)
            .map(GrantedAuthority::getAuthority)
            .anyMatch(ADMIN_AUTHORITY::equals);
    }

    public boolean isAuthenticated() {
        return Optional
            .ofNullable(SecurityContextHolder.getContext())
            .map(SecurityContext::getAuthentication)
            .filter(Authentication::isAuthenticated)
            .filter(not(this::isAnonymous))
            .isPresent();
    }

    private boolean isAnonymous(Authentication authentication) {
        return authentication instanceof AnonymousAuthenticationToken;
    }

    @Transactional
    public boolean deleteUser(Long personId) {
        if (repository.existsById(personId)) {
            repository.deleteById(personId);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public Person promotePerson(Long personId) {
        Person person = personService.getById(personId);
        person.getUser().withRole(ADMIN_AUTHORITY);
        return person;
    }

    @Transactional
    public Person unpromotePerson(Long personId) {
        Person person = personService.getById(personId);
        person.getUser().withoutRole(ADMIN_AUTHORITY);
        return person;
    }

    private boolean exists(CreateUserInput input) {
        return repository.existsByEmail(input.getEmail());
    }

    private JWTUserDetails getUserDetails(User user, String token) {
        return JWTUserDetails
            .builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .authorities(collectionStream(user.getRoles())
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()))
            .token(token)
            .build();
    }

    private Optional<DecodedJWT> getDecodedToken(String token) {
        try {
            return Optional.of(verifier.verify(token));
        } catch(JWTVerificationException ex) {
            return Optional.empty();
        }
    }
}
