package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.person.Person;
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
public class TeamMember {
    @EmbeddedId
    private TeamMemberId id;
    @ManyToOne
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    private Team team;
    @ManyToOne
    @JoinColumn(name = "person_id", insertable = false, updatable = false)
    private Person person;
    private boolean approved;

    public TeamMember approve() {
        this.approved = true;
        return this;
    }
}
