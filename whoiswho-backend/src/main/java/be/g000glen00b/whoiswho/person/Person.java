package be.g000glen00b.whoiswho.person;

import be.g000glen00b.whoiswho.review.StudyMaterialReview;
import be.g000glen00b.whoiswho.team.TeamMember;
import be.g000glen00b.whoiswho.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    @Setter
    @EqualsAndHashCode.Include
    private String firstName;
    @Setter
    @EqualsAndHashCode.Include
    private String lastName;
    @Setter
    @EqualsAndHashCode.Include
    private LocalDate employmentDate;
    @Setter
    @EqualsAndHashCode.Include
    private String telephoneNumber;
    @Setter
    @EqualsAndHashCode.Include
    private String title;
    @Setter
    @EqualsAndHashCode.Include
    private String avatarLocation;
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<StudyMaterialReview> reviews;
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<PersonSkillScore> skills;
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<TeamMember> teams;
    @OneToOne(mappedBy = "person")
    @EqualsAndHashCode.Include
    private User user;
}
