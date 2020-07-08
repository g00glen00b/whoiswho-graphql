package be.g000glen00b.whoiswho;

import be.g000glen00b.whoiswho.person.CreatePersonInput;
import be.g000glen00b.whoiswho.person.Person;
import be.g000glen00b.whoiswho.person.PersonAvatarService;
import be.g000glen00b.whoiswho.person.PersonService;
import be.g000glen00b.whoiswho.person.UpdatePersonInput;
import be.g000glen00b.whoiswho.review.CreateStudyMaterialReviewInput;
import be.g000glen00b.whoiswho.review.StudyMaterialReview;
import be.g000glen00b.whoiswho.review.StudyMaterialReviewService;
import be.g000glen00b.whoiswho.security.BadCredentialsException;
import be.g000glen00b.whoiswho.studymaterial.CreateStudyMaterialInput;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterial;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterialService;
import be.g000glen00b.whoiswho.team.Team;
import be.g000glen00b.whoiswho.team.TeamMemberService;
import be.g000glen00b.whoiswho.team.TeamService;
import be.g000glen00b.whoiswho.user.CreateUserInput;
import be.g000glen00b.whoiswho.user.UpdatePasswordInput;
import be.g000glen00b.whoiswho.user.User;
import be.g000glen00b.whoiswho.user.UserService;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.Part;

@Component
@RequiredArgsConstructor
public class MutationResolver implements GraphQLMutationResolver {
    private final UserService userService;
    private final PersonService personService;
    private final PersonAvatarService avatarService;
    private final TeamService teamService;
    private final TeamMemberService teamMemberService;
    private final StudyMaterialService studyMaterialService;
    private final AuthenticationProvider authenticationProvider;
    private final StudyMaterialReviewService reviewService;

    public User createUser(CreateUserInput userInfo, CreatePersonInput personInput) {
        Person person = personService.create(personInput);
        return userService.createUser(person, userInfo);
    }

    @PreAuthorize("isAuthenticated()")
    public User updatePassword(UpdatePasswordInput input) {
        return userService.updatePassword(userService.getCurrentUser().getPersonId(), input);
    }

    @PreAuthorize("isAuthenticated()")
    public Person updatePerson(UpdatePersonInput input) {
        return personService.update(userService.getCurrentUser().getPersonId(), input);
    }

    @PreAuthorize("isAuthenticated()")
    public Person updateAvatar(Part avatar, DataFetchingEnvironment environment) {
        Long personId = userService.getCurrentUser().getPersonId();
        Person person = personService.getById(personId);
        avatarService.deleteAvatar(person.getAvatarLocation());
        String newLocation = avatarService.updateAvatar(personId, environment.getArgument("avatar"));
        return personService.updateAvatarLocation(personId, newLocation);
    }

    @PreAuthorize("isAuthenticated()")
    public Team createTeam(String name) {
        return teamService.create(name, userService.getCurrentUser());
    }

    @PreAuthorize("isAuthenticated()")
    public StudyMaterial createStudyMaterial(CreateStudyMaterialInput input) {
        return studyMaterialService.create(input, userService.isAdmin());
    }

    @PreAuthorize("isAnonymous()")
    public User login(String email, String password) {
        UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(email, password);
        try {
            SecurityContextHolder.getContext().setAuthentication(authenticationProvider.authenticate(credentials));
            return userService.getCurrentUser();
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException(email);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public StudyMaterial approveStudyMaterial(long studyMaterialId) {
        return studyMaterialService.approve(studyMaterialId, true);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public StudyMaterial unapproveStudyMaterial(long studyMaterialId) {
        return studyMaterialService.approve(studyMaterialId, false);
    }

    @PreAuthorize("isAuthenticated()")
    public StudyMaterialReview review(CreateStudyMaterialReviewInput input) {
        return reviewService.review(input, userService.getCurrentUser());
    }

    @PreAuthorize("isAuthenticated()")
    public Team joinTeam(long teamId) {
        teamMemberService.join(teamId, userService.getCurrentUser(), userService.isAdmin());
        return teamService.getById(teamId);
    }

    @PreAuthorize("isAuthenticated()")
    public Team leaveTeam(long teamId) {
        teamMemberService.leave(teamId, userService.getCurrentUser());
        return teamService.getById(teamId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public boolean deleteUser(long personId) {
        return userService.deleteUser(personId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public boolean deleteTeam(long teamId) {
        return teamService.deleteTeam(teamId);
    }

    @PreAuthorize("isAuthenticated()")
    public Team approveTeamMember(long teamId, long personId) {
        teamMemberService.approve(teamId, personId, userService.getCurrentUser());
        return teamService.getById(teamId);
    }

    @PreAuthorize("isAuthenticated()")
    public Team replaceTeamLeader(long teamId, long personId) {
        teamMemberService.replaceTeamLeader(teamId, personId, userService.getCurrentUser());
        return teamService.getById(teamId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public Person promotePerson(long personId) {
        return userService.promotePerson(personId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public Person unpromotePerson(long personId) {
        return userService.unpromotePerson(personId);
    }
}
