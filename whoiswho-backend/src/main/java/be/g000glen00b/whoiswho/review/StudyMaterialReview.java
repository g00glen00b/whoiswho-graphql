package be.g000glen00b.whoiswho.review;

import be.g000glen00b.whoiswho.person.Person;
import be.g000glen00b.whoiswho.studymaterial.StudyMaterial;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyMaterialReview {
    @EmbeddedId
    private StudyMaterialReviewId id;
    @ManyToOne
    @JoinColumn(name = "person_id", insertable = false, updatable = false)
    private Person person;
    @ManyToOne
    @JoinColumn(name = "study_material_id", insertable = false, updatable = false)
    private StudyMaterial studyMaterial;
    @Setter
    private Integer rating;
    @Setter
    private LocalDate completionDate;
    @Setter
    private String review;
}
