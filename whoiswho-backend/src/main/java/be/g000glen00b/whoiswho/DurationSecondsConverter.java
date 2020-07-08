package be.g000glen00b.whoiswho;

import javax.persistence.AttributeConverter;
import java.time.Duration;

public class DurationSecondsConverter implements AttributeConverter<Duration, Long> {
    @Override
    public Long convertToDatabaseColumn(Duration duration) {
        return duration == null ? null : duration.toSeconds();
    }

    @Override
    public Duration convertToEntityAttribute(Long seconds) {
        return Duration.ofSeconds(seconds);
    }
}
