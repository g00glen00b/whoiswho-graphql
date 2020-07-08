package be.g000glen00b.whoiswho.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class UpdatePasswordInput {
    private final String originalPassword;
    private final String newPassword;
}
