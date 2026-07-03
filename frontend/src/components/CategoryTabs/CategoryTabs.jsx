const tabs = [
    "All Movies",
    "Action",
    "Sci-Fi",
    "Drama",
    "Animation",
    "Documentary",
  ];
  
  export default function CategoryTabs() {
    return (
      <div className="flex gap-3">
  
        {tabs.map((tab, i) => (
  
          <button
            key={tab}
            className={`px-5 py-2 rounded-full text-sm font-semibold
            ${
              i === 0
                ? "bg-red-600 text-white"
                : "bg-white"
            }`}
          >
            {tab}
          </button>
  
        ))}
  
      </div>
    );
  }