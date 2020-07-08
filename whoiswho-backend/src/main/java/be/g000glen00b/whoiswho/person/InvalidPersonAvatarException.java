package be.g000glen00b.whoiswho.person;

public class InvalidPersonAvatarException extends RuntimeException {
    private static final long serialVersionUID = 7920797798353926479L;

    public InvalidPersonAvatarException(String message) {
        super(message);
    }
}
