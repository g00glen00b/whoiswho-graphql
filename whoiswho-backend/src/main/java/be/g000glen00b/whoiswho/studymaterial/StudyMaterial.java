package be.g000glen00b.whoiswho.studymaterial;

import be.g000glen00b.whoiswho.DurationSecondsConverter;
import be.g000glen00b.whoiswho.review.StudyMaterialReview;
import be.g000glen00b.whoiswho.skill.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import static be.g000glen00b.whoiswho.StreamUtils.collectionStream;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "type")
    private StudyMaterialType type;
    @ManyToMany
    @JoinTable(
        name = "study_material_skill",
        joinColumns = @JoinColumn(name = "study_material_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;
    @OneToMany(mappedBy = "studyMaterial")
    private List<StudyMaterialReview> reviews;
    @ManyToOne
    @JoinColumn(name = "complexity")
    private StudyMaterialComplexity complexity;
    @Setter
    private boolean approved;
    @Convert(converter = DurationSecondsConverter.class)
    private Duration duration;

    public List<String> getSkillNames() {
        return collectionStream(getSkills())
            .map(Skill::getName)
            .collect(Collectors.toList());
    }
}
