package be.g000glen00b.whoiswho.studymaterial;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class StudyMaterialTypeNotFoundException extends RuntimeException {
    private static final long serialVersionUID = -3328412074990583395L;
    private final String code;

    @Override
    public String getMessage() {
        return MessageFormat.format("Study material type ''{0}'' isn''t available", code);
    }
}
