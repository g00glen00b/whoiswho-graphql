package be.g000glen00b.whoiswho.person;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PersonSortField {
    LAST_NAME("lastName"), EMPLOYMENT_DATE("employmentDate");

    private final String queryField;
}
