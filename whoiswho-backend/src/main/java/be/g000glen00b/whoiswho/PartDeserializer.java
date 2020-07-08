package be.g000glen00b.whoiswho;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.boot.jackson.JsonComponent;

import javax.servlet.http.Part;

@JsonComponent
public class PartDeserializer extends JsonDeserializer<Part> {
    @Override
    public Part deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) {
        return null;
    }
}
