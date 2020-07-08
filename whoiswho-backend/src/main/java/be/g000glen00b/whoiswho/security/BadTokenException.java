package be.g000glen00b.whoiswho.security;

public class BadTokenException extends RuntimeException {
    private static final long serialVersionUID = 158136221282852553L;

    @Override
    public String getMessage() {
        return "Token is invalid or expired";
    }
}
