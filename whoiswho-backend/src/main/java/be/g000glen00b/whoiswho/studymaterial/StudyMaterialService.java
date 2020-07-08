package be.g000glen00b.whoiswho.studymaterial;

import be.g000glen00b.whoiswho.skill.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;

@Service
@RequiredArgsConstructor
public class StudyMaterialService {
    private final StudyMaterialRepository repository;
    private final StudyMaterialTypeRepository typeRepository;
    private final StudyMaterialComplexityRepository complexityRepository;
    private final SkillService skillService;

    public List<StudyMaterial> getAll(int page, int size, boolean withUnapproved, StudyMaterialSort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort == null ? Sort.unsorted() : sort.getSort());
        if (withUnapproved) {
            return repository.findAll(pageRequest).getContent();
        } else {
            return repository.findAllApproved(pageRequest).getContent();
        }
    }

    public StudyMaterial getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new StudyMaterialNotFoundException(id));
    }

    public long countAll(boolean withUnapproved) {
        if (withUnapproved) {
            return repository.count();
        } else {
            return repository.countAllApproved();
        }
    }

    @Transactional
    public StudyMaterial create(CreateStudyMaterialInput input, boolean approved) {
        return repository.saveAndFlush(StudyMaterial
            .builder()
            .approved(approved)
            .complexity(getComplexity(input.getComplexity()))
            .name(input.getName())
            .skills(collectionStream(input.getSkills())
                .map(skillService::getSkill)
                .collect(Collectors.toList()))
            .type(getType(input.getType()))
            .duration(Duration.ofHours(input.getDurationHours()))
            .build());
    }

    @Transactional
    public StudyMaterial approve(Long id, boolean approved) {
        StudyMaterial studyMaterial = getById(id);
        studyMaterial.setApproved(approved);
        return studyMaterial;
    }

    public StudyMaterial getApprovedById(Long id) {
        return repository.findApprovedById(id).orElseThrow(() -> new StudyMaterialNotFoundException(id));
    }

    public int getAverageRating(Long id) {
        return repository.findAverageRating(id).orElse(0);
    }

    public List<String> getSkills(StudyMaterial studyMaterial) {
        return repository.findAllSkills(studyMaterial.getId());
    }

    public List<StudyMaterialType> getAllTypes() {
        return typeRepository.findAll();
    }

    public List<StudyMaterialComplexity> getAllComplexities() {
        return complexityRepository.findAll();
    }

    private StudyMaterialComplexity getComplexity(String code) {
        return complexityRepository.findById(code).orElseThrow(() -> new StudyMaterialComplexityNotFoundException(code));
    }

    private StudyMaterialType getType(String code) {
        return typeRepository.findById(code).orElseThrow(() -> new StudyMaterialTypeNotFoundException(code));
    }
}
