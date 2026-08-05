import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCaseStudies as fetchCaseStudiesApi } from "./caseStudiesApi";

export const fetchCaseStudies = createAsyncThunk(
  "caseStudies/fetchCaseStudies",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await fetchCaseStudiesApi(signal);
    } catch (error) {
      if (error.name === "AbortError") {
        throw error;
      }

      return rejectWithValue(error.message || "Unable to load case studies");
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    category: "All",
    query: "",
  },
};

const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {
    setCategoryFilter(state, action) {
      state.filters.category = action.payload;
    },
    setQueryFilter(state, action) {
      state.filters.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        if (action.error.name === "AbortError") {
          return;
        }

        state.status = "failed";
        state.error = action.payload || action.error.message || "Unable to load case studies";
      });
  },
});

export const { setCategoryFilter, setQueryFilter } = caseStudiesSlice.actions;

export default caseStudiesSlice.reducer;
