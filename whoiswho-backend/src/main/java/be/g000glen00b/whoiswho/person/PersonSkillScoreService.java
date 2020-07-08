package be.g000glen00b.whoiswho.person;

import be.g000glen00b.whoiswho.review.StudyMaterialReviewEvent;
import be.g000glen00b.whoiswho.review.StudyMaterialReviewEventListener;
import be.g000glen00b.whoiswho.skill.Skill;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;

@Service
@RequiredArgsConstructor
public class PersonSkillScoreService implements StudyMaterialReviewEventListener {
    private final PersonSkillScoreRepository skillScoreRepository;
    private final PersonService personService;

    public List<PersonSkillScore> getAllBySkill(String skill, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "experience"));
        return skillScoreRepository.findAllBySkillName(skill.toLowerCase(), pageRequest).getContent();
    }

    public long countAllBySkill(String skill) {
        return skillScoreRepository.countAllBySkillName(skill);
    }

    public List<PersonSkillScore> getAllByPerson(Person person, Integer size, PersonSkillSort sort) {
        Sort sorting = sort == null ? Sort.unsorted() : sort.getSort();
        if (size == null) {
            return skillScoreRepository.findAllByPersonId(person.getId(), sorting);
        } else {
            return skillScoreRepository.findAllByPersonId(person.getId(), PageRequest.of(0, size, sorting)).getContent();
        }
    }

    private PersonSkillScore getOrCreate(Person person, Skill skill) {
        PersonSkillScoreId id = new PersonSkillScoreId(person.getId(), skill.getId());
        return skillScoreRepository
            .findById(id)
            .orElseGet(() -> skillScoreRepository.saveAndFlush(PersonSkillScore
                .builder()
                .id(id)
                .person(person)
                .skill(skill)
                .experience(0L)
                .build()));
    }

    @Override
    @Transactional
    public void onStudyMaterialReview(StudyMaterialReviewEvent event) {
        Person person = personService.getById(event.getPersonId());
        collectionStream(event.getSkills())
            .map(skill -> getOrCreate(person, skill))
            .forEach(skillScore -> skillScore.increaseExperience(event.getExperience()));
    }
}
