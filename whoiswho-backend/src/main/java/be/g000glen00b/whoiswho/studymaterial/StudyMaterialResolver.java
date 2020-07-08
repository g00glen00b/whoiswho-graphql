package be.g000glen00b.whoiswho.studymaterial;

import be.g000glen00b.whoiswho.review.StudyMaterialReviewService;
import be.g000glen00b.whoiswho.user.User;
import be.g000glen00b.whoiswho.user.UserService;
import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StudyMaterialResolver implements GraphQLResolver<StudyMaterial> {
    private final StudyMaterialService service;
    private final StudyMaterialReviewService reviewService;
    private final UserService userService;

    public List<String> getSkills(StudyMaterial studyMaterial) {
        return service.getSkills(studyMaterial);
    }

    public int getAverageRating(StudyMaterial studyMaterial) {
        return service.getAverageRating(studyMaterial.getId());
    }

    public long getCompletedCount(StudyMaterial studyMaterial) {
        return reviewService.getReviewCount(studyMaterial);
    }

    public boolean getCompleted(StudyMaterial studyMaterial) {
        User currentUser = userService.getCurrentUser();
        return currentUser != null && reviewService.exists(studyMaterial, currentUser);
    }
}
