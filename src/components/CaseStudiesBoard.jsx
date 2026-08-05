import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiRefreshCcw, FiSearch } from "react-icons/fi";
import {
  selectCaseStudyError,
  selectCaseStudyFilters,
  selectCaseStudyStatus,
  selectFilteredCaseStudies,
  selectVisibleCount,
} from "../features/caseStudies/caseStudiesSelectors";
import {
  fetchCaseStudies,
  setCategoryFilter,
  setQueryFilter,
} from "../features/caseStudies/caseStudiesSlice";

const categories = ["All", "Web", "Mobile", "AI", "Blockchain"];

const categoryStyles = {
  Web: "from-cyan-400/20 to-blue-500/20 text-cyan-200 border-cyan-400/30",
  Mobile: "from-emerald-400/20 to-teal-500/20 text-emerald-200 border-emerald-400/30",
  AI: "from-fuchsia-400/20 to-purple-500/20 text-fuchsia-200 border-fuchsia-400/30",
  Blockchain: "from-amber-400/20 to-pink-500/20 text-amber-100 border-amber-300/30",
};

const CaseStudySkeleton = () => (
  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 animate-pulse">
    <div className="h-5 w-24 rounded-full bg-white/10" />
    <div className="mt-8 h-7 w-4/5 rounded bg-white/10" />
    <div className="mt-5 space-y-3">
      <div className="h-3 rounded bg-white/10" />
      <div className="h-3 w-11/12 rounded bg-white/10" />
      <div className="h-3 w-8/12 rounded bg-white/10" />
    </div>
    <div className="mt-8 h-4 w-20 rounded bg-white/10" />
  </div>
);

const FilterChip = ({ category, activeCategory, onClick }) => {
  const isActive = activeCategory === category;

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
        isActive
          ? "border-[#FC466B]/70 bg-gradient-to-r from-[#FC466B]/35 to-[#3F5EFB]/35 text-white shadow-lg shadow-[#3F5EFB]/10"
          : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-[#3F5EFB]/50 hover:text-white"
      }`}
    >
      {category}
    </button>
  );
};

const CaseStudyCard = ({ caseStudy }) => (
  <article className="group flex min-h-[260px] flex-col justify-between rounded-lg border border-white/10 bg-[#110D2E]/80 p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#3F5EFB]/60 hover:bg-[#151039]">
    <div>
      <div className="flex items-center justify-between gap-4">
        <span
          className={`rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-bold ${
            categoryStyles[caseStudy.category]
          }`}
        >
          {caseStudy.category}
        </span>
        <span className="text-sm font-semibold text-gray-400">{caseStudy.year}</span>
      </div>
      <h3 className="mt-8 text-2xl font-bold leading-tight text-white group-hover:text-cyan-100">
        {caseStudy.title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-gray-300">{caseStudy.summary}</p>
    </div>
    <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]" />
  </article>
);

const CaseStudiesBoard = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCaseStudyStatus);
  const error = useSelector(selectCaseStudyError);
  const filters = useSelector(selectCaseStudyFilters);
  const filteredCaseStudies = useSelector(selectFilteredCaseStudies);
  const visibleCount = useSelector(selectVisibleCount);

  useEffect(() => {
    if (status === "idle") {
      const request = dispatch(fetchCaseStudies());
      return () => request.abort();
    }
  }, [dispatch, status]);

  const handleRetry = () => {
    dispatch(fetchCaseStudies());
  };

  return (
    <section id="case-studies-board" className="container mx-auto px-4 py-20 lg:px-20">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#110D2E]/80 via-[#050023] to-[#110D2E]/80 px-4 py-10 shadow-2xl shadow-black/20 sm:px-8 lg:px-10">
        <div className="absolute -right-24 top-8 -z-0 h-64 w-64 rounded-full bg-[#3F5EFB]/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 -z-0 h-64 w-64 rounded-full bg-[#FC466B]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-[#3F5EFB]/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
              Async Case Studies
            </p>
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              Explore proven builds by category
            </h2>
            <p className="mt-4 text-gray-300">
              Filter real project patterns while Redux handles loading, errors, retry, search, and derived counts.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => dispatch(setQueryFilter(event.target.value))}
              placeholder="Search title or summary"
              className="min-h-12 w-full rounded-full border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-gray-500 focus:border-[#3F5EFB]/70 focus:ring-2 focus:ring-[#3F5EFB]/20"
            />
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <FilterChip
                key={category}
                category={category}
                activeCategory={filters.category}
                onClick={(nextCategory) => dispatch(setCategoryFilter(nextCategory))}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-400">
            {status === "succeeded" ? `${visibleCount} project${visibleCount === 1 ? "" : "s"} visible` : "Loading projects"}
          </p>
        </div>

        {status === "loading" && (
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CaseStudySkeleton key={index} />
            ))}
          </div>
        )}

        {status === "failed" && (
          <div className="relative z-10 mt-10 rounded-lg border border-red-400/30 bg-red-500/10 p-8 text-center">
            <h3 className="text-2xl font-bold text-white">Case studies could not load</h3>
            <p className="mt-3 text-red-100">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#6318F1] px-6 py-2 font-bold text-white transition hover:scale-105 hover:bg-gradient-to-r hover:from-[#FC466B]/60 hover:to-[#3F5EFB]/60"
            >
              <FiRefreshCcw />
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && filteredCaseStudies.length === 0 && (
          <div className="relative z-10 mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center">
            <h3 className="text-2xl font-bold text-white">No matching case studies</h3>
            <p className="mt-3 text-gray-300">Try a different category or search phrase.</p>
          </div>
        )}

        {status === "succeeded" && filteredCaseStudies.length > 0 && (
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-5 transition-opacity duration-300 md:grid-cols-2 lg:grid-cols-3">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesBoard;
