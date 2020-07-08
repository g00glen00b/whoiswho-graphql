package be.g000glen00b.whoiswho.studymaterial;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
    @Query("select m from StudyMaterial m where m.approved = true")
    Page<StudyMaterial> findAllApproved(Pageable page);

    @Query("select count(m) from StudyMaterial m where m.approved = true")
    long countAllApproved();

    @Query("select m from StudyMaterial m where m.approved = true and m.id = ?1")
    Optional<StudyMaterial> findApprovedById(Long id);

    @Query("select avg(mp.rating) from StudyMaterial m inner join m.reviews mp where m.id = ?1")
    Optional<Integer> findAverageRating(Long id);

    @Query("select s.name from StudyMaterial m inner join m.skills s where m.id = ?1")
    List<String> findAllSkills(Long id);
}
