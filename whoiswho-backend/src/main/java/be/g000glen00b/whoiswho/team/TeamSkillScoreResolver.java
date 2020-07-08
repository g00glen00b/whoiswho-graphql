package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.skill.SkillExperienceService;
import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class TeamSkillScoreResolver implements GraphQLResolver<TeamSkillScore> {
    private final SkillExperienceService skillService;
    private final TeamMemberService memberService;

    public int getLevel(TeamSkillScore skillScore) {
        long memberCount = memberService.countAllByTeam(skillScore.getTeam(), false);
        return skillService.getLevel(skillScore.getExperience() / memberCount).intValueExact();
    }

    public String getSkillName(TeamSkillScore skillScore) {
        return skillScore.getSkill().getName();
    }

    public boolean isMaxLevel(TeamSkillScore skillScore) {
        long memberCount = memberService.countAllByTeam(skillScore.getTeam(), false);
        return skillService.isMaxLevel(skillScore.getExperience() / memberCount);
    }

    public BigDecimal getProgress(TeamSkillScore skillScore) {
        long memberCount = memberService.countAllByTeam(skillScore.getTeam(), false);
        return skillService.getProgress(skillScore.getExperience() / memberCount);
    }
}
