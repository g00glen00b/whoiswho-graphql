package be.g000glen00b.whoiswho.team;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TeamSkillSortField {
    NAME("skill.name"),
    EXPERIENCE("experience");

    private final String queryField;
}
