package be.g000glen00b.whoiswho.studymaterial;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StudyMaterialSortField {
    NAME("name"), TYPE("type.description"), COMPLEXITY("complexity.score"), DURATION("duration");

    private final String queryField;
}
