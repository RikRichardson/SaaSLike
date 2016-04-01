package ru.saaslike.dto;

import java.io.Serializable;
import java.util.List;

/**
 * Данные для страницы (для пейджинга в контроллерах, DAO и т.д.)
 */
public class PagedData<D> implements Serializable {

    private List<D> pageData;
    private Long totalCount;

    public PagedData() {
    }

    public PagedData(List<D> pageData, Long totalCount) {
        this.pageData = pageData;
        this.totalCount = totalCount;
    }

    public List<D> getPageData() {
        return pageData;
    }

    public void setPageData(List<D> pageData) {
        this.pageData = pageData;
    }

    public Long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Long totalCount) {
        this.totalCount = totalCount;
    }
}
