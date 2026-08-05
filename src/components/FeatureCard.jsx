import React from "react";

const FeatureCard = ({ feature, icon: Icon, accent, isActive, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(feature.id)}
    className={`group flex min-h-[310px] w-full flex-col items-center justify-center rounded-lg border bg-[#0B0829]/80 p-8 text-center transition duration-300 hover:-translate-y-1 ${
      isActive
        ? `${accent.border} shadow-2xl shadow-[#3F5EFB]/20`
        : "border-white/10 hover:border-white/30"
    }`}
  >
    <span
      className={`flex h-24 w-24 items-center justify-center rounded-[22px] border bg-white/[0.04] transition duration-300 ${accent.border} ${accent.text} group-hover:scale-105`}
    >
      <Icon size={48} />
    </span>
    <h3 className="mt-7 text-2xl font-bold text-white">{feature.title}</h3>
    <span className={`mt-5 h-1 w-14 rounded-full bg-gradient-to-r ${accent.line}`} />
    <p className="mt-6 text-base leading-7 text-gray-300">{feature.desc}</p>
  </button>
);

export default FeatureCard;
