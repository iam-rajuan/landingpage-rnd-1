import { createSlice } from "@reduxjs/toolkit";

const features = [
  {
    id: "senior-engineers",
    title: "Senior Engineers",
    desc: "Top 5% vetted developers with real production experience",
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    desc: "Rapid execution with optimized workflows",
  },
  {
    id: "scalable-teams",
    title: "Scalable Teams",
    desc: "Easily scale teams based on project needs",
  },
  {
    id: "secure-by-design",
    title: "Secure by Design",
    desc: "Security-first architecture and implementation",
  },
];

const whyChooseUsSlice = createSlice({
  name: "whyChooseUs",
  initialState: {
    features,
    activeFeatureId: "senior-engineers",
  },
  reducers: {
    setActiveFeature(state, action) {
      state.activeFeatureId = action.payload;
    },
  },
});

export const { setActiveFeature } = whyChooseUsSlice.actions;

export const selectWhyChooseUsFeatures = (state) => state.whyChooseUs.features;
export const selectActiveFeatureId = (state) => state.whyChooseUs.activeFeatureId;

export default whyChooseUsSlice.reducer;
