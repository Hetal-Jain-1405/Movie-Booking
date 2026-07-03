


export default function Hero() {
    return (
      <section
        className="mt-8 rounded-3xl h-[420px] bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
  
        <div className="relative z-10 text-white p-16 max-w-xl">
  
          <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
            New Release
          </span>
  
          <h1 className="text-6xl font-bold mt-5">
            The Horizon Protocol
          </h1>
  
          <p className="mt-6 text-gray-200">
            In a world where memories can be traded as currency,
            one detective uncovers a conspiracy that threatens
            humanity.
          </p>
  
          <div className="mt-10 flex gap-4">
  
            <button className="bg-red-600 px-8 py-4 rounded-xl font-bold">
              Book Tickets
            </button>
  
          </div>
  
        </div>
      </section>
    );
  }