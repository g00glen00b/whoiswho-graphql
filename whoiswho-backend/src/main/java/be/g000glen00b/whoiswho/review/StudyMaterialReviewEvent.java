package be.g000glen00b.whoiswho.review;

import be.g000glen00b.whoiswho.skill.Skill;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;

@Getter
@Builder
public class StudyMaterialReviewEvent {
    private final int experience;
    private final Collection<Skill> skills;
    private final long personId;
}
