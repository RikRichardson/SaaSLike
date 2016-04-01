package ru.saaslike.web.filter;

import net.sf.ehcache.constructs.web.filter.SimplePageCachingFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

public class LocaleSimplePageCachingFilter extends SimplePageCachingFilter {
    @Autowired
    private LocaleResolver localeResolver;

    @Override
    protected String calculateKey(HttpServletRequest httpRequest) {
        Locale locale = localeResolver.resolveLocale(httpRequest);
        StringBuilder sb = new StringBuilder(locale.toLanguageTag());

        sb.append(httpRequest.getMethod()); // we use REST - the same URL can be used with different methods
        sb.append(httpRequest.getMethod()).append(httpRequest.getRequestURI()).append(httpRequest.getQueryString());

        String key = sb.toString();

        return key;
    }
}
