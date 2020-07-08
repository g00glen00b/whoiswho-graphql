package be.g000glen00b.whoiswho.review;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMaterialReviewRepository extends JpaRepository<StudyMaterialReview, StudyMaterialReviewId> {
    long countAllByStudyMaterialId(Long studyMaterialId);
    long countAllByPersonId(Long personId);
}
