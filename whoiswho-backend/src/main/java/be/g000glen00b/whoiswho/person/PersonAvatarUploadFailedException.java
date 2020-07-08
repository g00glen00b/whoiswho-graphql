package be.g000glen00b.whoiswho.person;

import java.text.MessageFormat;

public class PersonAvatarUploadFailedException extends RuntimeException {
    private static final long serialVersionUID = -7414577423701985906L;
    private final String file;

    public PersonAvatarUploadFailedException(String file, Throwable cause) {
        super(cause);
        this.file = file;
    }

    @Override
    public String getMessage() {
        return MessageFormat.format("Unable to upload file ''{0}''", file);
    }
}
