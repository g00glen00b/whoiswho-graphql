package be.g000glen00b.whoiswho.person;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonSkillScoreRepository extends JpaRepository<PersonSkillScore, PersonSkillScoreId> {
    Page<PersonSkillScore> findAllByPersonId(Long personId, Pageable page);
    List<PersonSkillScore> findAllByPersonId(Long personId, Sort sort);
    @Query("select ss from PersonSkillScore ss inner join ss.skill s where lower(s.name) = ?1")
    Page<PersonSkillScore> findAllBySkillName(String skill, Pageable page);
    @Query("select count(ss) from PersonSkillScore ss inner join ss.skill s where lower(s.name) = ?1")
    long countAllBySkillName(String skill);
}
