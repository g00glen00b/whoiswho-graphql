package be.g000glen00b.whoiswho.studymaterial;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class StudyMaterialNotFoundException extends RuntimeException {
    private static final long serialVersionUID = -4439961852852144386L;
    private final Long id;

    @Override
    public String getMessage() {
        return MessageFormat.format("Study material with ID ''{0}'' isn''t available", id);
    }
}
