package be.g000glen00b.whoiswho.skill;

import be.g000glen00b.whoiswho.Order;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class SkillSort {
    private final SkillSortField field;
    private final Order order;

    public Sort getSort() {
        return Sort.by(getOrder().getSortDirection(), getField().getQueryField());
    }
}
