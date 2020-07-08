package be.g000glen00b.whoiswho.team;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class TeamAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = -9016953604357697982L;
    private final String name;

    @Override
    public String getMessage() {
        return MessageFormat.format("Team with name ''{0}'' already exists", name);
    }
}
