package be.g000glen00b.whoiswho.person;

import be.g000glen00b.whoiswho.skill.SkillExperienceService;
import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class PersonSkillScoreResolver implements GraphQLResolver<PersonSkillScore> {
    private final SkillExperienceService skillService;

    public int getLevel(PersonSkillScore skillScore) {
        return skillService.getLevel(skillScore.getExperience()).intValueExact();
    }

    public String getSkillName(PersonSkillScore skillScore) {
        return skillScore.getSkill().getName();
    }

    public boolean isMaxLevel(PersonSkillScore skillScore) {
        return skillService.isMaxLevel(skillScore.getExperience());
    }

    public BigDecimal getProgress(PersonSkillScore skillScore) {
        return skillService.getProgress(skillScore.getExperience());
    }
}
