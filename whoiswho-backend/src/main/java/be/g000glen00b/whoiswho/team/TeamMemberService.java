package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;

@Service
@RequiredArgsConstructor
public class TeamMemberService {
    private final TeamMemberRepository repository;
    private final TeamService teamService;

    public List<TeamMember> getAllByPerson(Long personId, boolean withUnapproved) {
        if (withUnapproved) {
            return repository.findAllByPerson(personId);
        } else {
            return repository.findAllApprovedByPerson(personId);
        }
    }

    @Transactional
    public void approve(Long teamId, Long personId, User user) {
        Team team = teamService.getById(teamId);
        if (team.isLeader(user)) {
            TeamMemberId id = new TeamMemberId(teamId, personId);
            collectionStream(team.getMembers())
                .filter(member -> id.equals(member.getId()))
                .findAny()
                .ifPresent(TeamMember::approve);
        }
    }

    @Transactional
    public void replaceTeamLeader(Long teamId, Long personId, User user) {
        Team team = teamService.getById(teamId);
        if (team.isLeader(user)) {
            repository
                .findById(new TeamMemberId(teamId, personId))
                .ifPresent(team::assignLeader);
        }
    }


    public List<TeamMember> getAllByTeam(Long teamId, boolean withUnapproved) {
        if (withUnapproved) {
            return repository.findAllByTeam(teamId);
        } else {
            return repository.findAllApprovedByTeam(teamId);
        }
    }

    public long countAllByTeam(Team team, boolean withUnapproved) {
        if (withUnapproved) {
            return repository.countAllByTeam(team.getId());
        } else {
            return repository.countAllApprovedByTeam(team.getId());
        }
    }

    public boolean isMember(Team team, User user) {
        return user != null && repository.existsById(new TeamMemberId(team.getId(), user.getPersonId()));
    }


    @Transactional
    public void join(Long teamId, User user, boolean approved) {
        Team team = teamService.getById(teamId);
        TeamMemberId id = new TeamMemberId(teamId, user.getPersonId());
        if (!repository.existsById(id)) {
            repository.saveAndFlush(TeamMember
                .builder()
                .id(id)
                .person(user.getPerson())
                .team(team)
                .approved(approved)
                .build());
        }
    }

    @Transactional
    public void leave(Long teamId, User user) {
        repository.deleteById(new TeamMemberId(teamId, user.getPersonId()));
    }

    public long countAllByPerson(Long personId) {
        return repository.countAllApprovedByPerson(personId);
    }
}
