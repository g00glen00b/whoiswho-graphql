package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.review.StudyMaterialReviewEvent;
import be.g000glen00b.whoiswho.review.StudyMaterialReviewEventListener;
import be.g000glen00b.whoiswho.skill.Skill;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;

@Service
@RequiredArgsConstructor
public class TeamSkillScoreService implements StudyMaterialReviewEventListener {
    private final TeamSkillScoreRepository repository;
    private final TeamMemberService teamMemberService;

    private TeamSkillScore getByTeam(Team team, Skill skill) {
        TeamSkillScoreId id = new TeamSkillScoreId(team.getId(), skill.getId());
        return repository
            .findById(id)
            .orElseGet(() -> repository.saveAndFlush(TeamSkillScore
                .builder()
                .id(id)
                .team(team)
                .skill(skill)
                .experience(0L)
                .build()));
    }

    public List<TeamSkillScore> getAllByTeam(Team team, Integer size, TeamSkillSort sort) {
        Sort sorting = sort == null ? Sort.unsorted() : sort.getSort();
        if (size == null) {
            return repository.findAllByTeamId(team.getId(), sorting);
        } else {
            return repository.findAllByTeamId(team.getId(), PageRequest.of(0, size, sorting)).getContent();
        }
    }

    public List<TeamSkillScore> getAllBySkill(String skill, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "experience"));
        return repository.findAllBySkillName(skill.toLowerCase(), pageRequest).getContent();
    }

    public long countAllBySkill(String skill) {
        return repository.countAllBySkillName(skill.toLowerCase());
    }

    @Override
    public void onStudyMaterialReview(StudyMaterialReviewEvent event) {
        collectionStream(event.getSkills())
            .flatMap(skill -> teamMemberService
                .getAllByPerson(event.getPersonId(), false)
                .stream()
                .map(TeamMember::getTeam)
                .map(team -> getByTeam(team, skill)))
            .forEach(skillScore -> skillScore.increaseExperience(event.getExperience()));
    }
}
