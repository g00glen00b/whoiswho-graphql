package be.g000glen00b.whoiswho.person;

import be.g000glen00b.whoiswho.Order;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class PersonSort {
    private final PersonSortField field;
    private final Order order;

    public Sort getSort() {
        return Sort.by(getOrder().getSortDirection(), getField().getQueryField());
    }
}
