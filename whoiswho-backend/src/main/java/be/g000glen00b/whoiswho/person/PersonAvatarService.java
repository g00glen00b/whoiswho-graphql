package be.g000glen00b.whoiswho.person;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.servlet.http.Part;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.text.MessageFormat;
import java.time.Clock;
import java.util.Optional;

import static java.nio.charset.Charset.defaultCharset;

@Service
@RequiredArgsConstructor
public class PersonAvatarService {
    private final PersonAvatarProperties personAvatarProperties;
    private final Clock clock;
    private final MessageDigest messageDigest;
    private final ResourceLoader resourceLoader;

    public String updateAvatar(Long personId, Part avatar) {
        try {
            PersonAvatarFile file = new PersonAvatarFile(avatar, personId, clock);
            BufferedImage scaled = file.scale(personAvatarProperties.getMaxDimensions());
            String filename = file.getFilename(this::hash);
            ImageIO.write(scaled, file.getType(), getLocation(filename));
            return filename;
        } catch (IOException ex) {
            throw new PersonAvatarUploadFailedException(avatar.getSubmittedFileName(), ex);
        }
    }

    public boolean deleteAvatar(String avatarLocation) {
        try {
            return avatarLocation != null && getLocation(avatarLocation).delete();
        } catch (IOException ex) {
            throw new PersonAvatarDeleteFailedException(ex);
        }
    }

    public String getPublicURL(String avatarLocation) {
        String location = Optional
            .ofNullable(avatarLocation)
            .orElse(personAvatarProperties.getDefaultAvatar());
        return MessageFormat.format("{0}/avatar/{1}", personAvatarProperties.getBaseDomain(), location);
    }

    private File getLocation(String filename) throws IOException {
        return new File(resourceLoader.getResource(personAvatarProperties.getLocation()).getFile(), filename);
    }

    private String hash(String identifier) {
        byte[] digest = messageDigest.digest(identifier.getBytes(defaultCharset()));
        String result = "";
        for (byte digestByte : digest) {
            result = result + getHexadecimal(digestByte);
        }
        return result;
    }

    private String getHexadecimal(byte digestByte) {
        return String.format("%02x", digestByte);
    }
}
