package be.g000glen00b.whoiswho.person;

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
public class PersonSkillScore {
    @EmbeddedId
    private PersonSkillScoreId id;
    @ManyToOne
    @JoinColumn(name = "skill_id", insertable = false, updatable = false)
    private Skill skill;
    @ManyToOne
    @JoinColumn(name = "person_id", insertable = false, updatable = false)
    private Person person;
    private Long experience;

    public PersonSkillScore increaseExperience(Integer newExperience) {
        this.experience += newExperience;
        return this;
    }
}
