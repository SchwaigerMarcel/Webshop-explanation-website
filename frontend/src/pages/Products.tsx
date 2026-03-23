import { useState, useEffect } from "react";
import { ProductCard, type Product } from "../components/ProductCard";
import { Loader2 } from "lucide-react";

// Die Kategorien sollten exakt so heißen wie im AdminDashboard
const CATEGORIES = ["Alle", "Küchenmesser", "Jagdmesser", "Outdoor", "Klappmesser"];

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Nutze den vollen Pfad, um Probleme mit dem Proxy zu vermeiden
    fetch("https://messerschmiede-schwaiger.at/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Laden der Produkte");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch-Fehler:", err);
        setError("Produkte konnten nicht geladen werden.");
        setLoading(false);
      });
  }, []);

  const filteredProducts = selectedCategory === "Alle"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-amber-500">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-neutral-500 animate-pulse">Schmiedefeuer wird entfacht...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-amber-500 mb-4 uppercase tracking-tighter">
            Unsere Meisterstücke
          </h1>
          <div className="h-1 w-24 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-neutral-400 max-w-2xl mx-auto italic">
            Vom rohen Stahl zum präzisen Werkzeug. Entdecken Sie unsere handgefertigten Unikate aus der Schmiede.
          </p>
        </div>

        {/* Filter-Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-2 text-sm uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-amber-600 border-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]"
                  : "border-neutral-800 text-neutral-500 hover:border-amber-600/50 hover:text-amber-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid-Ansicht */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-lg">
            <p className="text-neutral-500">In dieser Kategorie befinden sich aktuell keine Messer im Bestand.</p>
          </div>
        )}
      </div>
    </div>
  );
}