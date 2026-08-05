import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRocket, FaShieldHalved } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiUsersThreeBold } from "react-icons/pi";
import {
  selectActiveFeatureId,
  selectWhyChooseUsFeatures,
  setActiveFeature,
} from "../features/whyChooseUs/whyChooseUsSlice";
import FeatureCard from "./FeatureCard";

const featureVisuals = {
  "senior-engineers": {
    icon: PiUsersThreeBold,
    accent: {
      border: "border-fuchsia-400/70",
      text: "text-fuchsia-300",
      line: "from-fuchsia-400 to-purple-400",
    },
  },
  "fast-delivery": {
    icon: FaRocket,
    accent: {
      border: "border-blue-400/70",
      text: "text-blue-300",
      line: "from-blue-400 to-cyan-300",
    },
  },
  "scalable-teams": {
    icon: HiOutlineUserGroup,
    accent: {
      border: "border-cyan-400/70",
      text: "text-cyan-300",
      line: "from-cyan-400 to-emerald-300",
    },
  },
  "secure-by-design": {
    icon: FaShieldHalved,
    accent: {
      border: "border-pink-400/70",
      text: "text-pink-300",
      line: "from-pink-400 to-[#FC466B]",
    },
  },
};

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const features = useSelector(selectWhyChooseUsFeatures);
  const activeFeatureId = useSelector(selectActiveFeatureId);

  return (
    <section className="container mx-auto px-4 py-20 lg:px-20">
      <div className="relative overflow-hidden py-6 text-white">
        <div className="pointer-events-none absolute -left-32 -top-40 h-72 w-72 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/5" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full border border-fuchsia-500/20 bg-blue-500/5" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-[#3F5EFB]/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
            Why Choose Us
          </p>
          <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Why Companies{" "}
            <span className="bg-gradient-to-r from-[#B545FF] via-[#3F5EFB] to-[#23E0D5] bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-300">
            We deliver scalable, secure, and future-ready solutions.
          </p>
          <div className="mx-auto mt-7 h-1 w-36 rounded-full bg-gradient-to-r from-[#B545FF] to-[#23E0D5]" />
        </div>

        <div className="relative z-10 mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const visual = featureVisuals[feature.id];

            return (
              <FeatureCard
                key={feature.id}
                feature={feature}
                icon={visual.icon}
                accent={visual.accent}
                isActive={feature.id === activeFeatureId}
                onClick={(featureId) => dispatch(setActiveFeature(featureId))}
              />
            );
          })}
        </div>

        <div className="relative z-10 mt-12 flex flex-col items-center gap-5">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#6038FF] to-[#EA0FB8] px-8 py-3 text-lg font-bold text-white shadow-xl shadow-[#6318F1]/25 transition hover:scale-105"
          >
            Start Your Project
          </a>
          <p className="text-gray-400">Let's build something amazing together.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
