package be.g000glen00b.whoiswho.studymaterial;

import lombok.RequiredArgsConstructor;

import java.text.MessageFormat;

@RequiredArgsConstructor
public class StudyMaterialComplexityNotFoundException extends RuntimeException {
    private static final long serialVersionUID = -6710178797486354719L;
    private final String code;

    @Override
    public String getMessage() {
        return MessageFormat.format("Study material complexity ''{0}'' isn''t available", code);
    }
}
