package be.g000glen00b.whoiswho.review;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class CreateStudyMaterialReviewInput {
    private final Long id;
    private final LocalDate completionDate;
    private final int rating;
    private final String review;
}
