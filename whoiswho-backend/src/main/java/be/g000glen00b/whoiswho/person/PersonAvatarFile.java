package be.g000glen00b.whoiswho.person;

import lombok.Getter;
import org.springframework.http.MediaType;

import javax.imageio.ImageIO;
import javax.servlet.http.Part;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.MessageFormat;
import java.time.Clock;
import java.time.Instant;
import java.util.function.Function;

@Getter
public class PersonAvatarFile {
    private final BufferedImage image;
    private final String identifier;
    private final String type;

    public PersonAvatarFile(Part file, Long personId, Clock clock) throws IOException {
        this.type = getType(file.getContentType());
        this.image = ImageIO.read(file.getInputStream());
        long epoch = Instant.now(clock).toEpochMilli();
        this.identifier = MessageFormat.format("{0}_{1}_{2}", personId, file.getSubmittedFileName(), epoch);
    }

    public BufferedImage scale(Dimensions dimensions) {
        int maxWidth = dimensions.getWidth();
        int maxHeight = dimensions.getHeight();
        if (image.getWidth() >= image.getHeight() && image.getWidth() > maxWidth) {
            int newHeight = (int) (image.getHeight() * ((float) maxWidth / image.getWidth()));
            return getBufferered(image.getScaledInstance(maxWidth, newHeight, BufferedImage.SCALE_SMOOTH), maxWidth, newHeight);
        } else if (image.getHeight() > image.getWidth() && image.getHeight() > maxHeight) {
            int newWidth = (int) (image.getWidth() * ((float) maxHeight / image.getHeight()));
            return getBufferered(image.getScaledInstance(newWidth, maxHeight, BufferedImage.SCALE_SMOOTH), newWidth, maxHeight);
        } else {
            return image;
        }
    }

    public String getFilename(Function<String, String> hashing) {
        return MessageFormat.format("{0}.{1}", hashing.apply(identifier), type);
    }

    private BufferedImage getBufferered(Image image, int width, int height) {
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        bufferedImage.createGraphics().drawImage(image, 0, 0, null);
        return bufferedImage;
    }

    private String getType(String mimetype) {
        MediaType mediaType = MediaType.parseMediaType(mimetype);
        if (!isImage(mediaType)) throw new InvalidPersonAvatarException("Invalid content-type");
        else if (isJpeg(mediaType)) return "jpg";
        else return mediaType.getSubtype();
    }

    private boolean isJpeg(MediaType mediaType) {
        return "jpeg".equalsIgnoreCase(mediaType.getSubtype());
    }

    private boolean isImage(MediaType mediaType) {
        return "image".equalsIgnoreCase(mediaType.getType());
    }
}
