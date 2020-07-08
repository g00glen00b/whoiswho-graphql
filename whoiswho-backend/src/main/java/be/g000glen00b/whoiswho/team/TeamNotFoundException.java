package be.g000glen00b.whoiswho.team;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class TeamNotFoundException extends RuntimeException {
    private static final long serialVersionUID = -4939110080842529605L;
    private final Long id;

    @Override
    public String getMessage() {
        return MessageFormat.format("Team with ID ''{0}'' isn''t available", id);
    }
}
