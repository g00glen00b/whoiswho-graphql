package be.g000glen00b.whoiswho.person;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
@ConfigurationProperties(prefix = "whoiswho.avatar")
@Getter
@RequiredArgsConstructor
public class PersonAvatarProperties {
    /**
     * Location to store avatars
     */
    private final String location = "file:./filestorage/";

    /**
     * Default avatar within the location used to serve when no avatar was set up yet
     */
    private final String defaultAvatar = "default.png";

    /**
     * Maximum avatar width used for storage
     */
    private final int maxWidth = 200;

    /**
     * Maximum avatar height used for storage
     */
    private final int maxHeight = 200;

    /**
     * Base domain that will be used to serve the images
     */
    private final String baseDomain = "http://localhost:8080";

    public Dimensions getMaxDimensions() {
        return new Dimensions(maxWidth, maxHeight);
    }
}
