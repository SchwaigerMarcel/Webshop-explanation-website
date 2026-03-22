import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

interface Product {
    id: number;
    name: string;
    category: string;
    price: string | number;
    description: string;
    long_description: string; // Datenbank-Name
    image: string;
    features: string[];
    specifications: { label: string; value: string }[];
}

export function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fehler beim Laden:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-amber-500" size={48} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl text-amber-500 mb-4">Produkt nicht gefunden</h1>
                    <Link to="/produkte" className="inline-flex items-center gap-2 text-neutral-300 hover:text-amber-500 transition-colors">
                        <ArrowLeft size={20} /> Zurück zu den Produkten
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-950 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate("/produkte")}
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-amber-500 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Zurück zu den Produkten
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="aspect-square bg-neutral-900 border border-amber-900/20">
                        <img
                            // Wir stellen sicher, dass JEDES lokale Bild mit / beginnt
                            src={product.image.startsWith('http')
                                ? product.image
                                : product.image.startsWith('/')
                                    ? product.image
                                    : `/${product.image}`
                            }
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.error("Detail-Bild Fehler Pfad:", product.image);
                                // Notfall-Versuch: Falls /Amber.jpeg nicht geht, probiere Amber.jpeg
                                const target = e.target as HTMLImageElement;
                                if (!target.src.includes('http') && target.src.includes('/products/')) {
                                    target.src = target.src.replace('/products/', '/');
                                }
                            }}
                        />
                    </div>

                    <div>
                        <p className="text-amber-600 text-sm uppercase tracking-wide mb-3">{product.category}</p>
                        <h1 className="text-4xl font-serif text-white mb-4">{product.name}</h1>
                        <p className="text-3xl text-amber-500 mb-6">€{Number(product.price).toFixed(2)}</p>

                        <p className="text-neutral-300 leading-relaxed mb-8">
                            {product.long_description || product.description}
                        </p>

                        {/* Features - Das alte Design ist zurück! */}
                        {product.features && product.features.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl text-amber-500 uppercase tracking-wide mb-4">Eigenschaften</h2>
                                <ul className="space-y-3">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-neutral-300">
                                            <Check className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Specifications - Die alte Tabelle ist zurück! */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl text-amber-500 uppercase tracking-wide mb-4">Technische Daten</h2>
                                <div className="bg-neutral-900 border border-amber-900/20 p-6">
                                    <dl className="space-y-3">
                                        {product.specifications.map((spec, index) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-neutral-800 last:border-0">
                                                <dt className="text-neutral-400">{spec.label}:</dt>
                                                <dd className="text-white">{spec.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        )}

                        <div className="bg-amber-900/20 border border-amber-600/30 p-6">
                            <h3 className="text-xl text-amber-500 mb-3">Interesse?</h3>
                            <p className="text-neutral-300 mb-4">Kontaktieren Sie uns für eine Beratung...</p>
                            <div className="space-y-2 text-neutral-300 text-sm">
                                <p>Telefon: +49 8652 9876543</p>
                                <p>E-Mail: info@schwaiger-messer.de</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}