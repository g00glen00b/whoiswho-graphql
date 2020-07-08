package be.g000glen00b.whoiswho.skill;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Optional<Skill> findByName(String name);
    @Query("select s from Skill s where lower(s.name) like ?1")
    Page<Skill> findAllByNameLike(String expression, Pageable page);
    @Query("select count(distinct s) from Skill s where lower(s.name) like ?1")
    long countAllByNameLike(String expression);
}
