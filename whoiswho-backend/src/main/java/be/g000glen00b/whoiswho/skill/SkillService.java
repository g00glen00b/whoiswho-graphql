package be.g000glen00b.whoiswho.skill;

import be.g000glen00b.whoiswho.StreamUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class SkillService {
    private static final String WILDCARD_SYMBOL = "%";
    private final SkillRepository repository;

    public List<String> getAll(String search, int page, int size, SkillSort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort == null ? Sort.unsorted() : sort.getSort());
        return Stream.of(repository.findAllByNameLike(getWildcardSearch(search), pageRequest))
            .map(Page::getContent)
            .flatMap(StreamUtils::collectionStream)
            .map(Skill::getName)
            .collect(Collectors.toList());
    }

    public long countAll(String search) {
        return repository.countAllByNameLike(getWildcardSearch(search));
    }

    public Skill getSkill(String name) {
        return repository
            .findByName(name)
            .orElseGet(() -> repository.saveAndFlush(Skill
                .builder()
                .name(name)
                .build()));
    }

    private String getWildcardSearch(String search) {
        return search == null ? WILDCARD_SYMBOL : search.toLowerCase(Locale.getDefault()) + WILDCARD_SYMBOL;
    }
}
