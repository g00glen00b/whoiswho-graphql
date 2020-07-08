package be.g000glen00b.whoiswho.user;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class UserAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 8369435603356630425L;
    private final String email;

    @Override
    public String getMessage() {
        return MessageFormat.format("A user already exists with email ''{0}''", email);
    }
}
