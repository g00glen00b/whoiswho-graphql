package be.g000glen00b.whoiswho.studymaterial;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyMaterialComplexity {
    @Id
    private String code;
    private String description;
    private Integer score;
}
