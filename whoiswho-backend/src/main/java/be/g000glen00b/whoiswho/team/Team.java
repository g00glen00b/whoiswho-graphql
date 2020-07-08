package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.person.Person;
import be.g000glen00b.whoiswho.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "leader_person_id")
    private Person leader;
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<TeamMember> members;
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<TeamSkillScore> skills;

    public Team assignLeader(TeamMember member) {
        this.leader = member.getPerson();
        return this;
    }

    public boolean isLeader(User user) {
        return user != null && user.getPerson().equals(getLeader());
    }
}
