import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: string | number;
  description: string;
  category: string;
  image: string;      // Der Ordnername (z.B. 'amber')
  images?: string[];  // Das Array vom Backend (z.B. ['main.png', '1.jpg'])
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // 1. Wir nehmen das, was das Backend als erstes im Array liefert (ist meistens 'main.*')
  // 2. Fallback auf 'main.jpg', falls das Array aus irgendeinem Grund leer ist
  const fileName = product.images && product.images.length > 0 
    ? product.images[0] 
    : "main.jpg";

  // Die absolute URL stellt sicher, dass das Bild von überall (auch Detailseiten) geladen wird
  const imageSrc = `https://messerschmiede-schwaiger.at/api/images/${product.image}/${fileName}`;

  return (
    <Link
      to={`/produkte/${product.id}`}
      className="group bg-neutral-900 border border-amber-900/20 hover:border-amber-600/50 transition-all duration-300 overflow-hidden flex flex-col h-full rounded-sm"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-neutral-800 relative">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Verhindert Endlosschleife, falls der Platzhalter auch nicht lädt
            if (!target.src.includes('via.placeholder.com')) {
              target.src = "https://via.placeholder.com/600x600.png?text=Bild+nicht+gefunden";
            }
          }}
        />
        {/* Subtiles Overlay beim Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <p className="text-amber-600 text-[10px] uppercase tracking-[0.2em] font-bold">
                {product.category}
            </p>
        </div>
        
        <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors font-serif italic">
          {product.name}
        </h3>
        
        <p className="text-neutral-500 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-800/50">
            <p className="text-2xl text-amber-500 font-serif">
              €{Number(product.price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-amber-600 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Details →
            </span>
        </div>
      </div>
    </Link>
  );
}