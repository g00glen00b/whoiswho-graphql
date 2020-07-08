package be.g000glen00b.whoiswho.security;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

@Getter
public class JWTPreAuthenticationToken extends PreAuthenticatedAuthenticationToken {
    private static final long serialVersionUID = -5304730621727936850L;

    @Builder
    public JWTPreAuthenticationToken(JWTUserDetails principal, WebAuthenticationDetails details) {
        super(principal, null, principal.getAuthorities());
        super.setDetails(details);
    }

    @Override
    public Object getCredentials() {
        return null;
    }
}
