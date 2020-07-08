package be.g000glen00b.whoiswho.person;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PersonSkillSortField {
    NAME("skill.name"),
    EXPERIENCE("experience");

    private final String queryField;
}
