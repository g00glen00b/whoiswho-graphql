package be.g000glen00b.whoiswho.skill;

import be.g000glen00b.whoiswho.studymaterial.StudyMaterial;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

@Service
public class SkillExperienceService {
    private static final BigDecimal MAX_LEVEL = new BigDecimal("50");
    private static final BigDecimal LEVEL_FACTOR = new BigDecimal("0.3");

    public BigDecimal getLevel(Long experience) {
        return BigDecimal
            .valueOf(experience)
            .sqrt(MathContext.DECIMAL32)
            .multiply(LEVEL_FACTOR)
            .add(BigDecimal.ONE)
            .setScale(0, RoundingMode.FLOOR)
            .min(MAX_LEVEL);
    }

    public boolean isMaxLevel(Long experience) {
        return MAX_LEVEL.compareTo(getLevel(experience)) == 0;
    }

    public BigDecimal getProgress(Long experience) {
        BigDecimal currentLevel = getLevel(experience);
        BigDecimal nextLevel = getLevel(experience).add(BigDecimal.ONE).min(MAX_LEVEL);
        BigDecimal minimumExperience = getExperience(currentLevel);
        BigDecimal maximumExperience = getExperience(nextLevel);
        return BigDecimal
            .valueOf(experience)
            .subtract(minimumExperience)
            .divide(maximumExperience.subtract(minimumExperience), MathContext.DECIMAL32);
    }

    public Integer getExperience(StudyMaterial studyMaterial) {
        return BigDecimal
            .valueOf(studyMaterial.getDuration().toMinutes())
            .multiply(BigDecimal.valueOf(studyMaterial.getComplexity().getScore()))
            .intValue();
    }

    private BigDecimal getExperience(BigDecimal level) {
        return level
            .subtract(BigDecimal.ONE)
            .divide(LEVEL_FACTOR, MathContext.DECIMAL32)
            .pow(2);
    }
}
