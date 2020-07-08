package be.g000glen00b.whoiswho.studymaterial;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.Duration;
import java.util.List;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class CreateStudyMaterialInput {
    private final String name;
    private final String type;
    private final List<String> skills;
    private final String complexity;
    private final int durationHours;

    public Duration getDuration() {
        return Duration.ofHours(getDurationHours());
    }
}
