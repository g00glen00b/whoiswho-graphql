package be.g000glen00b.whoiswho.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class StudyMaterialReviewId implements Serializable {
    private static final long serialVersionUID = 6192876080716184506L;
    @Column(name = "person_id")
    private Long personId;
    @Column(name = "study_material_id")
    private Long studyMaterialId;
}
