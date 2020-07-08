package be.g000glen00b.whoiswho.team;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamSkillScoreRepository extends JpaRepository<TeamSkillScore, TeamSkillScoreId> {
    Page<TeamSkillScore> findAllByTeamId(Long teamId, Pageable page);
    List<TeamSkillScore> findAllByTeamId(Long teamId, Sort sort);
    @Query("select ss from TeamSkillScore ss inner join ss.skill s where lower(s.name) = ?1")
    Page<TeamSkillScore> findAllBySkillName(String skill, Pageable page);
    @Query("select count(ss) from TeamSkillScore ss inner join ss.skill s where lower(s.name) = ?1")
    long countAllBySkillName(String skill);
}
