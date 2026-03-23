import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader2, ChevronLeft, ChevronRight, Phone, Mail, X } from "lucide-react";

const API_BASE_URL = "https://messerschmiede-schwaiger.at/api";
interface Product {
  id: number;
  name: string;
  category: string;
  price: string | number;
  description: string;
  long_description: string;
  image: string;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Für die Großansicht

  useEffect(() => {
    console.log("1. ProductDetail geladen für ID:", id); // Muss in der Konsole erscheinen!
    window.scrollTo(0, 0);

    if (!id) {
      console.error("Fehler: Keine ID in der URL gefunden!");
      return;
    }

    const fetchUrl = `/api/products/${id}`;
    console.log("2. Starte Fetch an:", fetchUrl);

    fetch(fetchUrl)
      .then((res) => {
        console.log("3. Server Antwort-Status:", res.status);
        if (!res.ok) throw new Error(`HTTP Fehler! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("4. Daten erfolgreich empfangen:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("5. Kritischer Fehler beim Laden:", err);
        setLoading(false);
      });
  }, [id]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Verhindert, dass die Lightbox beim Klicken auf Pfeile öffnet
    if (!product?.images) return;
    setCurrentImgIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product?.images) return;
    setCurrentImgIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-neutral-950 min-h-screen py-12">
      {/* LIGHTBOX / GROSSANSICHT */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors">
            <X size={40} />
          </button>
          <img
            src={`https://messerschmiede-schwaiger.at/api/images/${product.image}/${product.images[currentImgIdx]}`}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Bild nicht gefunden unter:", (e.target as HTMLImageElement).src);
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/produkte")}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-amber-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Zurück zu den Produkten
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* BILDER SLIDER */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-square bg-neutral-900 border border-amber-900/20 group overflow-hidden shadow-2xl cursor-zoom-in"
          >
            {product && product.images && product.images.length > 0 ? (
              <img
                src={`${API_BASE_URL}/images/products/${product.image}/${product.images[currentImgIdx]}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-500">
                Bild wird geladen oder fehlt...
              </div>
            )}

            {/* Navigations-Pfeile: Mobil immer sichtbar, Desktop hover */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white transition-opacity lg:opacity-0 lg:group-hover:opacity-100 hover:bg-amber-600 rounded-full z-10"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white transition-opacity lg:opacity-0 lg:group-hover:opacity-100 hover:bg-amber-600 rounded-full z-10"
                >
                  <ChevronRight size={30} />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(idx); }}
                      className={`h-2 rounded-full transition-all ${idx === currentImgIdx ? 'bg-amber-500 w-6' : 'bg-white/30 w-2'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RECHTER TEIL: PRODUKT-INFOS */}
          <div>
            <p className="text-amber-600 text-sm uppercase tracking-wide mb-3">{product.category}</p>
            <h1 className="text-4xl font-serif text-white mb-4 uppercase">{product.name}</h1>
            <p className="text-3xl text-amber-500 mb-6">€{Number(product.price).toFixed(2)}</p>

            <p className="text-neutral-300 leading-relaxed mb-8">
              {product.long_description || product.description}
            </p>

            {/* Eigenschaften */}
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

            {/* Technische Daten */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl text-amber-500 uppercase tracking-wide mb-4">Technische Daten</h2>
                <div className="bg-neutral-900 border border-amber-900/20 p-6 shadow-inner">
                  <dl className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-neutral-800 last:border-0">
                        <dt className="text-neutral-400">{spec.label}:</dt>
                        <dd className="text-white font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Kontakt-Box */}
            <div className="bg-amber-900/10 border border-amber-600/20 p-8 shadow-lg">
              <h3 className="text-xl text-amber-500 mb-4 uppercase tracking-wider font-serif italic">Unikat anfragen</h3>
              <div className="space-y-4">
                <a href="tel:+4367763547065" className="flex justify-between border-b border-amber-900/20 pb-2 text-neutral-300 hover:text-amber-500 transition-colors">
                  <span className="text-neutral-500 flex items-center gap-2"><Phone size={16} /> Telefon:</span>
                  <span className="font-medium">+43 677 635 47065</span>
                </a>
                <a href="mailto:info@messerschmiede-schwaiger.at" className="flex justify-between border-b border-amber-900/20 pb-2 text-neutral-300 hover:text-amber-500 transition-colors">
                  <span className="text-neutral-500 flex items-center gap-2"><Mail size={16} /> E-Mail:</span>
                  <span className="font-medium">info@messerschmiede-schwaiger.at</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}