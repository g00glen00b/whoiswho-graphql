package be.g000glen00b.whoiswho.user;

import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserResolver implements GraphQLResolver<User> {
    private final UserService service;

    @PreAuthorize("isAuthenticated()")
    public String getToken(User user) {
        return service.getToken(user);
    }
}
