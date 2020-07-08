package be.g000glen00b.whoiswho.team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMember, TeamMemberId> {
    @Query("select m from TeamMember m inner join m.team t where t.id = ?1 and m.approved = true")
    List<TeamMember> findAllApprovedByTeam(Long teamId);

    @Query("select m from TeamMember m inner join m.team t where t.id = ?1")
    List<TeamMember> findAllByTeam(Long teamId);

    @Query("select m from TeamMember m inner join m.person p where p.id = ?1 and m.approved = true")
    List<TeamMember> findAllApprovedByPerson(Long personId);

    @Query("select m from TeamMember m inner join m.person p where p.id = ?1")
    List<TeamMember> findAllByPerson(Long personId);

    @Query("select count(m) from TeamMember m inner join m.team t where t.id = ?1")
    long countAllByTeam(Long teamId);

    @Query("select count(m) from TeamMember m inner join m.team t where t.id = ?1 and m.approved = true")
    long countAllApprovedByTeam(Long teamId);

    @Query("select count(m) from TeamMember m inner join m.person p where p.id = ?1 and m.approved = true")
    long countAllApprovedByPerson(Long personId);
}
