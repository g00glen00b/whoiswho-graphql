package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository repository;

    public List<Team> getAll(int page, int size, TeamSort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort == null ? Sort.unsorted() : sort.getSort());
        return repository.findAll(pageRequest).getContent();
    }

    public long countAll() {
        return repository.count();
    }

    public Team getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new TeamNotFoundException(id));
    }

    @Transactional
    public Team create(String name, User user) {
        if (!repository.existsByName(name)) {
            Team team = repository.saveAndFlush(Team
                .builder()
                .name(name)
                .leader(user.getPerson())
                .members(new ArrayList<>())
                .build());
            team.getMembers().add(TeamMember
                .builder()
                .id(new TeamMemberId(team.getId(), user.getPersonId()))
                .person(user.getPerson())
                .approved(true)
                .build());
            return team;
        } else {
            throw new TeamAlreadyExistsException(name);
        }
    }

    @Transactional
    public boolean deleteTeam(Long teamId) {
        if (repository.existsById(teamId)) {
            repository.deleteById(teamId);
            return true;
        } else {
            return false;
        }
    }
}
