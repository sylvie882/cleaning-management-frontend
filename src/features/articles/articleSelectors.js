// src/features/articles/articleSelectors.js

// Basic selectors
export const selectArticles = (state) => state.articles.articles;
export const selectCurrentArticle = (state) => state.articles.currentArticle;
export const selectRelatedArticles = (state) => state.articles.relatedArticles;
export const selectArticleStats = (state) => state.articles.stats;
export const selectArticlePagination = (state) => state.articles.pagination;
export const selectArticleFilters = (state) => state.articles.filters;

// Loading and error states
export const selectArticleLoading = (state) => state.articles.isLoading;
export const selectArticleSuccess = (state) => state.articles.isSuccess;
export const selectArticleError = (state) => state.articles.isError;
export const selectArticleMessage = (state) => state.articles.message;

// Derived selectors
export const selectPublishedArticles = (state) =>
  state.articles.articles.filter((article) => article.status === "published");

export const selectDraftArticles = (state) =>
  state.articles.articles.filter((article) => article.status === "draft");

export const selectArchivedArticles = (state) =>
  state.articles.articles.filter((article) => article.status === "archived");

export const selectArticlesByCategory = (state, category) =>
  state.articles.articles.filter((article) => article.category === category);

export const selectArticlesByAuthor = (state, authorId) =>
  state.articles.articles.filter((article) => article.author._id === authorId);

export const selectArticlesByTag = (state, tag) =>
  state.articles.articles.filter((article) => article.tags.includes(tag));

export const selectTopViewedArticles = (state, limit = 5) =>
  [...state.articles.articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);

export const selectTopRatedArticles = (state, limit = 5) =>
  [...state.articles.articles]
    .sort((a, b) => b.seoScore - a.seoScore)
    .slice(0, limit);

export const selectRecentArticles = (state, limit = 5) =>
  [...state.articles.articles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

export const selectFilteredArticles = (state) => {
  const { articles } = state.articles;
  const { status, category, search, tags } = state.articles.filters;

  return articles.filter((article) => {
    // Filter by status
    if (status && article.status !== status) return false;

    // Filter by category
    if (category && article.category !== category) return false;

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(",");
      const hasMatchingTag = tagArray.some((tag) =>
        article.tags.includes(tag.trim())
      );
      if (!hasMatchingTag) return false;
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    return true;
  });
};

// Stats selectors
export const selectTotalArticles = (state) =>
  state.articles.stats?.overview?.totalArticles || 0;

export const selectPublishedArticlesCount = (state) =>
  state.articles.stats?.overview?.publishedArticles || 0;

export const selectDraftArticlesCount = (state) =>
  state.articles.stats?.overview?.draftArticles || 0;

export const selectArchivedArticlesCount = (state) =>
  state.articles.stats?.overview?.archivedArticles || 0;

export const selectTotalViews = (state) =>
  state.articles.stats?.overview?.totalViews || 0;

export const selectAverageSEOScore = (state) =>
  state.articles.stats?.overview?.avgSEOScore || 0;

export const selectCategoryStats = (state) =>
  state.articles.stats?.categoryStats || [];

export const selectRecentArticlesStats = (state) =>
  state.articles.stats?.recentArticles || [];

// SEO-related selectors
export const selectArticlesNeedingSEOImprovement = (state) =>
  state.articles.articles.filter((article) => article.seoScore < 70);

export const selectArticlesWithLowWordCount = (state) =>
  state.articles.articles.filter((article) => article.wordCount < 300);

export const selectArticlesWithoutMetaDescription = (state) =>
  state.articles.articles.filter(
    (article) =>
      !article.metaDescription || article.metaDescription.length < 120
  );

export const selectArticlesWithoutKeywords = (state) =>
  state.articles.articles.filter(
    (article) => !article.keywords || article.keywords.length < 3
  );

// Performance selectors
export const selectArticlesByPerformance = (state) => {
  const articles = [...state.articles.articles];
  return articles.sort((a, b) => {
    // Calculate performance score based on multiple factors
    const scoreA =
      a.views * 0.4 + a.likes * 0.3 + a.shares * 0.2 + a.seoScore * 0.1;
    const scoreB =
      b.views * 0.4 + b.likes * 0.3 + b.shares * 0.2 + b.seoScore * 0.1;
    return scoreB - scoreA;
  });
};

// Utility selectors
export const selectArticleCategories = (state) => {
  const categories = new Set(
    state.articles.articles.map((article) => article.category)
  );
  return Array.from(categories);
};

export const selectArticleTags = (state) => {
  const tags = new Set();
  state.articles.articles.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
};

export const selectArticleAuthors = (state) => {
  const authors = new Map();
  state.articles.articles.forEach((article) => {
    if (article.author) {
      authors.set(article.author._id, article.author);
    }
  });
  return Array.from(authors.values());
};
