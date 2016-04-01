package ru.saaslike.web.dto;

/**
 * error details transfered to client
 */
public class WebErrorDetail {

    private final int status;
    private final String message;
    private final String url;

    public WebErrorDetail(int status, String message, String url) {
        this.status = status;
        this.message = message;
        this.url = url;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public String getUrl() {
        return url;
    }
}
