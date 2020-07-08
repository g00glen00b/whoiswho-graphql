package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.skill.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamSkillScore {
    @EmbeddedId
    private TeamSkillScoreId id;
    @ManyToOne
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    private Team team;
    @ManyToOne
    @JoinColumn(name = "skill_id", insertable = false, updatable = false)
    private Skill skill;
    private Long experience;

    public void increaseExperience(Integer newExperience) {
        this.experience += newExperience;
    }
}
