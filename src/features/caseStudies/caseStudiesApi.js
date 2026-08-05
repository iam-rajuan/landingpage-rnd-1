const caseStudies = [
  {
    id: "web-commerce-platform",
    title: "Composable Commerce Platform",
    category: "Web",
    summary: "A modular storefront with fast checkout, inventory sync, and analytics dashboards.",
    year: 2026,
  },
  {
    id: "mobile-care-companion",
    title: "Care Companion Mobile App",
    category: "Mobile",
    summary: "HIPAA-minded patient reminders, appointment booking, and family status updates.",
    year: 2025,
  },
  {
    id: "ai-support-agent",
    title: "AI Support Automation",
    category: "AI",
    summary: "A knowledge-grounded assistant that reduced first-response time across support teams.",
    year: 2026,
  },
  {
    id: "blockchain-traceability",
    title: "Supply Chain Traceability",
    category: "Blockchain",
    summary: "Tamper-resistant product provenance for suppliers, warehouses, and retailers.",
    year: 2024,
  },
  {
    id: "web-booking-engine",
    title: "Real Estate Booking Engine",
    category: "Web",
    summary: "High-converting property search, virtual tour scheduling, and lead routing.",
    year: 2025,
  },
  {
    id: "mobile-fitness-studio",
    title: "Fitness Studio App",
    category: "Mobile",
    summary: "Class reservations, habit tracking, in-app payments, and member progress insights.",
    year: 2024,
  },
  {
    id: "ai-demand-forecasting",
    title: "Demand Forecasting Suite",
    category: "AI",
    summary: "Predictive planning tools that helped operations teams reduce stockouts.",
    year: 2025,
  },
  {
    id: "blockchain-nft-marketplace",
    title: "NFT Marketplace Launch",
    category: "Blockchain",
    summary: "Wallet onboarding, creator royalties, collection pages, and smart contract flows.",
    year: 2026,
  },
];

export const fetchCaseStudies = (signal) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error("Network failed"));
        return;
      }

      resolve(caseStudies);
    }, 800);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true }
    );
  });
