package be.g000glen00b.whoiswho;

import be.g000glen00b.whoiswho.person.Person;
import be.g000glen00b.whoiswho.person.PersonService;
import be.g000glen00b.whoiswho.person.PersonSkillScore;
import be.g000glen00b.whoiswho.person.PersonSkillScoreService;
import be.g000glen00b.whoiswho.person.PersonSort;
import be.g000glen00b.whoiswho.skill.SkillService;
import be.g000glen00b.whoiswho.skill.SkillSort;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterial;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterialComplexity;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterialService;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterialSort;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterialType;
import be.g000glen00b.whoiswho.team.Team;
import be.g000glen00b.whoiswho.team.TeamService;
import be.g000glen00b.whoiswho.team.TeamSkillScore;
import be.g000glen00b.whoiswho.team.TeamSkillScoreService;
import be.g000glen00b.whoiswho.team.TeamSort;
import be.g000glen00b.whoiswho.user.User;
import be.g000glen00b.whoiswho.user.UserService;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class QueryResolver implements GraphQLQueryResolver {
    private final PersonService personService;
    private final PersonSkillScoreService personSkillScoreService;
    private final StudyMaterialService studyMaterialService;
    private final TeamService teamService;
    private final TeamSkillScoreService teamSkillScoreService;
    private final UserService userService;
    private final SkillService skillService;

    public List<Person> getAllPeople(int page, int size, PersonSort sort) {
        return personService.getAll(page, size, sort);
    }

    public long getPeopleCount() {
        return personService.countAll();
    }

    public Person getPerson(long personId) {
        return personService.getById(personId);
    }

    public List<StudyMaterial> getAllStudyMaterial(int page, int size, boolean withUnapproved, StudyMaterialSort sort) {
        return studyMaterialService.getAll(page, size, withUnapproved && userService.isAdmin(), sort);
    }

    public List<StudyMaterialType> getAllStudyMaterialTypes() {
        return studyMaterialService.getAllTypes();
    }

    public List<StudyMaterialComplexity> getAllStudyMaterialComplexities() {
        return studyMaterialService.getAllComplexities();
    }

    public StudyMaterial getStudyMaterial(Long studyMaterialId) {
        if (userService.isAdmin()) {
            return studyMaterialService.getById(studyMaterialId);
        } else {
            return studyMaterialService.getApprovedById(studyMaterialId);
        }
    }

    public long getStudyMaterialCount(boolean withUnapproved) {
        return studyMaterialService.countAll(withUnapproved && userService.isAdmin());
    }

    public List<Team> getAllTeams(int page, int size, TeamSort sort) {
        return teamService.getAll(page, size, sort);
    }

    public long getTeamCount() {
        return teamService.countAll();
    }

    public Team getTeam(long teamId) {
        return teamService.getById(teamId);
    }

    public long getSkillCount(String search) {
        return skillService.countAll(search);
    }

    public List<String> getAllSkills(String search, int page, int size, SkillSort sort) {
        return skillService.getAll(search, page, size, sort);
    }

    public User getCurrentUser() {
        return userService.getCurrentUser();
    }

    public List<PersonSkillScore> getAllPersonHiscores(String skill, int page, int size) {
        return personSkillScoreService.getAllBySkill(skill, page, size);
    }

    public long getPersonHiscoresCount(String skill) {
        return personSkillScoreService.countAllBySkill(skill);
    }

    public List<TeamSkillScore> getAllTeamHiscores(String skill, int page, int size) {
        return teamSkillScoreService.getAllBySkill(skill, page, size);
    }

    public long getTeamHiscoresCount(String skill) {
        return teamSkillScoreService.countAllBySkill(skill);
    }
}
