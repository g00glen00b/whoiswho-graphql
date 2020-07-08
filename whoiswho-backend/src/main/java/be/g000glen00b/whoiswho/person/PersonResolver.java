package be.g000glen00b.whoiswho.person;

import be.g000glen00b.whoiswho.review.StudyMaterialReviewService;
import be.g000glen00b.whoiswho.team.TeamMember;
import be.g000glen00b.whoiswho.team.TeamMemberService;
import be.g000glen00b.whoiswho.user.User;
import be.g000glen00b.whoiswho.user.UserService;
import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PersonResolver implements GraphQLResolver<Person> {
    private final UserService userService;
    private final PersonSkillScoreService skillScoreService;
    private final TeamMemberService teamMemberService;
    private final StudyMaterialReviewService reviewService;
    private final PersonAvatarService avatarService;

    public String getEmail(Person person) {
        return userService.isAuthenticated() && person.getUser() != null ? person.getUser().getEmail() : null;
    }

    public String getTelephoneNumber(Person person) {
        return userService.isAuthenticated() ? person.getTelephoneNumber() : null;
    }

    public String getAvatar(Person person) {
        return avatarService.getPublicURL(person.getAvatarLocation());
    }

    public Collection<String> getRoles(Person person) {
        return person.getUser().getRoles();
    }

    public List<TeamMember> getTeams(Person person, boolean withUnapproved) {
        User currentUser = userService.getCurrentUser();
        boolean allowedUnapproved = currentUser.getPerson().equals(person) || userService.isAdmin();
        return teamMemberService.getAllByPerson(person.getId(), withUnapproved && allowedUnapproved);
    }

    public List<PersonSkillScore> getSkills(Person person, Integer size, PersonSkillSort sort) {
        return skillScoreService.getAllByPerson(person, size, sort);
    }

    public long getTeamCount(Person person) {
        return teamMemberService.countAllByPerson(person.getId());
    }

    public long getReviewCount(Person person) {
        return reviewService.countAllByPerson(person.getId());
    }
}
