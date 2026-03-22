import { useState, useEffect } from "react";
import { ProductCard, type Product } from "../components/ProductCard";
import { Loader2 } from "lucide-react";

const CATEGORIES = ["Alle", "Küchenmesser", "Jagdmesser", "Outdoor", "Taschenmesser"];

export function Products() {
  const [products, setProducts] = useState<Product[]>([]); // Wichtig: <Product[]> fixiert den 'never' Fehler
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = selectedCategory === "Alle"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-amber-500">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-amber-500 mb-4">
            UNSERE MESSER
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Handgeschmiedete Qualität für höchste Ansprüche. Jedes Messer ein
            Unikat.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 border transition-all ${
                selectedCategory === cat
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "border-amber-900/30 text-neutral-400 hover:border-amber-600/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}