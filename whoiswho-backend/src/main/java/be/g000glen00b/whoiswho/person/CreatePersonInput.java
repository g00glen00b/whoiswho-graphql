package be.g000glen00b.whoiswho.person;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class CreatePersonInput {
    private final String firstName;
    private final String lastName;
    private final LocalDate employmentDate;
    private final String telephoneNumber;
    private final String title;
}
