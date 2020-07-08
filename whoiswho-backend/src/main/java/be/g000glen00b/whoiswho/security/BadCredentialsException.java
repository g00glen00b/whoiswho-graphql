package be.g000glen00b.whoiswho.security;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class BadCredentialsException extends RuntimeException {
    private static final long serialVersionUID = 4129146858129498534L;
    private final String email;

    @Override
    public String getMessage() {
        return MessageFormat.format("Email or password didn''t match for ''{0}''", email);
    }
}
