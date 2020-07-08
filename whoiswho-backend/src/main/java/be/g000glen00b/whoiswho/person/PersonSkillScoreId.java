package be.g000glen00b.whoiswho.person;

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
public class PersonSkillScoreId implements Serializable {
    private static final long serialVersionUID = -4149575008915177215L;
    @Column(name = "person_id")
    private Long personId;
    @Column(name = "skill_id")
    private Long skillId;
}
