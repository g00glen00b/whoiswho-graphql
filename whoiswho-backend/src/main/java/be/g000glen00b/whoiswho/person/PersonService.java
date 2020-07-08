package be.g000glen00b.whoiswho.person;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository repository;

    public List<Person> getAll(int page, int size, PersonSort sort) {
        PageRequest pageRequest = PageRequest.of(page, size, sort == null ? Sort.unsorted() : sort.getSort());
        return repository.findAll(pageRequest).getContent();
    }

    @Transactional
    public Person create(CreatePersonInput input) {
        return repository.saveAndFlush(Person
            .builder()
            .firstName(input.getFirstName())
            .lastName(input.getLastName())
            .employmentDate(input.getEmploymentDate())
            .telephoneNumber(input.getTelephoneNumber())
            .title(input.getTitle())
            .reviews(List.of())
            .skills(List.of())
            .teams(List.of())
            .build());
    }

    @Transactional
    public Person update(Long personId, UpdatePersonInput input) {
        Person person = getById(personId);
        person.setFirstName(input.getFirstName());
        person.setLastName(input.getLastName());
        person.setEmploymentDate(input.getEmploymentDate());
        person.setTelephoneNumber(input.getTelephoneNumber());
        return person;
    }

    @Transactional
    public Person updateAvatarLocation(Long personId, String avatarLocation) {
        Person person = getById(personId);
        person.setAvatarLocation(avatarLocation);
        return person;
    }

    public long countAll() {
        return repository.count();
    }

    public Person getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new PersonNotFoundException(id));
    }
}
