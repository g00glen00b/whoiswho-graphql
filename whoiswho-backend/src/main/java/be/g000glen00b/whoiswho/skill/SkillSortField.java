package be.g000glen00b.whoiswho.skill;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SkillSortField {
    NAME("name");

    private final String queryField;
}
