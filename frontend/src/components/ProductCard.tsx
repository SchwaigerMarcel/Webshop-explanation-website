import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: string | number;
  description: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/produkte/${product.id}`}
      className="group bg-neutral-900 border border-amber-900/20 hover:border-amber-600/50 transition-all overflow-hidden flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-neutral-800">
        <img
          src={`/${product.image}/main.jpg`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback: Falls main.jpg nicht existiert, versuche main.jpeg
            const target = e.target as HTMLImageElement;
            if (!target.src.endsWith('.jpeg')) {
              target.src = `/${product.image}/main.jpeg`;
            }
          }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-amber-600 text-xs uppercase tracking-wide mb-2">
          {product.category}
        </p>
        <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-neutral-400 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        <p className="text-2xl text-amber-500 font-serif">
          €{Number(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}