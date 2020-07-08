package be.g000glen00b.whoiswho.team;

import be.g000glen00b.whoiswho.Order;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class TeamSort {
    private final TeamSortField field;
    private final Order order;

    public Sort getSort() {
        return Sort.by(getOrder().getSortDirection(), getField().getQueryField());
    }
}
