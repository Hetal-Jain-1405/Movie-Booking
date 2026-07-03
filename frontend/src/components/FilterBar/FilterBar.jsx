export default function FilterBar() {
    return (
      <div className="flex gap-3">
  
        <button className="bg-white px-4 py-2 rounded-lg">
          Filters
        </button>
  
        <select className="bg-white px-4 py-2 rounded-lg">
          <option>Most Popular</option>
          <option>Latest</option>
        </select>
  
      </div>
    );
  }