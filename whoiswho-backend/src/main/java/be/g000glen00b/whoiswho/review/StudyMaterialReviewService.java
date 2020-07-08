package be.g000glen00b.whoiswho.review;

import be.g000glen00b.whoiswho.person.Person;
import be.g000glen00b.whoiswho.skill.SkillExperienceService;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterial;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterialService;
import be.g000glen00b.whoiswho.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class StudyMaterialReviewService {
    private final StudyMaterialReviewRepository repository;
    private final StudyMaterialService studyMaterialService;
    private final SkillExperienceService skillExperienceService;
    private final Collection<? extends StudyMaterialReviewEventListener> listeners;

    @Transactional
    public StudyMaterialReview review(CreateStudyMaterialReviewInput input, User user) {
        StudyMaterial studyMaterial = studyMaterialService.getApprovedById(input.getId());
        Person person = user.getPerson();
        StudyMaterialReviewId id = new StudyMaterialReviewId(person.getId(), studyMaterial.getId());
        StudyMaterialReview review = repository
            .findById(id)
            .orElseGet(() -> repository.saveAndFlush(StudyMaterialReview
                .builder()
                .id(id)
                .person(person)
                .rating(input.getRating())
                .review(input.getReview())
                .completionDate(input.getCompletionDate())
                .studyMaterial(studyMaterial)
                .build()));
        review.setCompletionDate(input.getCompletionDate());
        review.setRating(input.getRating());
        review.setReview(input.getReview());
        updateSubscribers(review);
        return review;
    }

    public long getReviewCount(StudyMaterial studyMaterial) {
        return repository.countAllByStudyMaterialId(studyMaterial.getId());
    }

    public boolean exists(StudyMaterial studyMaterial, User user) {
        StudyMaterialReviewId id = new StudyMaterialReviewId(user.getPersonId(), studyMaterial.getId());
        return repository.existsById(id);
    }

    public long countAllByPerson(Long personId) {
        return repository.countAllByPersonId(personId);
    }

    private void updateSubscribers(StudyMaterialReview review) {
        StudyMaterialReviewEvent event = StudyMaterialReviewEvent
            .builder()
            .experience(skillExperienceService.getExperience(review.getStudyMaterial()))
            .personId(review.getPerson().getId())
            .skills(review.getStudyMaterial().getSkills())
            .build();
        listeners.forEach(listener -> listener.onStudyMaterialReview(event));
    }
}
