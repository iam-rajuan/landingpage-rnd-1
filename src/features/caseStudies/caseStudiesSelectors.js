import { createSelector } from "@reduxjs/toolkit";

export const selectCaseStudyItems = (state) => state.caseStudies.items;
export const selectCaseStudyStatus = (state) => state.caseStudies.status;
export const selectCaseStudyError = (state) => state.caseStudies.error;
export const selectCaseStudyFilters = (state) => state.caseStudies.filters;

export const selectFilteredCaseStudies = createSelector(
  [selectCaseStudyItems, selectCaseStudyFilters],
  (items, filters) => {
    const query = filters.query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = filters.category === "All" || item.category === filters.category;
      const searchableText = `${item.title} ${item.summary}`.toLowerCase();
      const matchesQuery = !query || searchableText.includes(query);

      return matchesCategory && matchesQuery;
    });
  }
);

export const selectVisibleCount = createSelector(
  [selectFilteredCaseStudies],
  (filteredItems) => filteredItems.length
);
