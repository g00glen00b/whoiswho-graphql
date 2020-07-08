package be.g000glen00b.whoiswho.team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TeamSkillScoreId implements Serializable {
    private static final long serialVersionUID = -6103015185784540892L;
    @Column(name = "team_id")
    private Long teamId;
    @Column(name = "skill_id")
    private Long skillId;
}
