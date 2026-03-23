import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, Hammer, Award, ArrowRight, Scissors, Zap } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string | number;
  description: string;
  category: string;
  image: string;      // Ordnername
  images?: string[];  // Dateiliste vom Backend
}

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Absolute URL zum Backend
    fetch("https://messerschmiede-schwaiger.at/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Wir nehmen die ersten 3 Messer als "Featured"
          setFeaturedProducts(data.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Home-Produkte:", err);
      });
  }, []);

  return (
    <div className="bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-8 md:py-12">
        <div className="absolute inset-0">
          {/* Hinweis: Stelle sicher, dass das Bild in /public liegt oder via Import geladen wird */}
          <img
            src="/api/images/page/Schmiede.jpg"
            alt="Schmiede"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center w-full">
            <Flame className="text-amber-500 w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-6 shrink-0" />

            <h1 className="font-serif text-white mb-6 leading-[1.1] uppercase w-full 
               /* 1. Schriftgröße: Auf Mobile etwas kleiner (8vw), damit 'Handgeschmiedete' passt */
               text-[8vw] sm:text-[7vw] lg:text-7xl 
               /* 2. Umbruch-Schutz: Erlaubt Silbentrennung, falls das Wort zu lang ist */
               break-words hyphens-auto
               /* 3. Abstände: Tracking auf Mobile eng, damit mehr in eine Zeile passt */
               tracking-tighter sm:tracking-wide text-center">

              <span className="block sm:inline">Handgeschmiedete</span>

              {/* Dieser Umbruch erscheint nur auf Tablets/PC, um das Design zu wahren */}
              <br className="hidden sm:block" />

              <span className="text-amber-500 block sm:inline"> Meisterwerke</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-neutral-300 mb-8 max-w-[90%] sm:max-w-2xl mx-auto leading-relaxed">
              Jedes Messer ein Unikat. <br />
              Geschmiedet mit Leidenschaft und Präzision.
            </p>

            <div className="flex justify-center w-full px-4">
              <Link
                to="/produkte"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 md:px-8 md:py-4 uppercase tracking-wide transition-all text-xs sm:text-base whitespace-nowrap shadow-xl"
              >
                Messer entdecken <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="hidden md:block py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Hammer className="text-amber-500 w-8 h-8" />}
              title="Handarbeit"
              text="Jedes Messer wird von Hand geschmiedet und individuell bearbeitet."
            />
            <FeatureCard
              icon={<Award className="text-amber-500 w-8 h-8" />}
              title="Meisterqualität"
              text="Handwerkskunst für langlebige und scharfe Messer."
            />
            <FeatureCard
              icon={<Flame className="text-amber-500 w-8 h-8" />}
              title="Beste Materialien"
              text="Hochwertige Stähle und edle Hölzer für höchste Langlebigkeit."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="pt-10 pb-20 md:py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-amber-500 mb-4">AUSGEWÄHLTE MESSER</h2>
            <p className="text-neutral-400">Eine Auswahl unserer handgeschmiedeten Meisterstücke</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              // Dynamische Bild-Logik (wie in ProductCard)
              const fileName = (product.images && product.images.length > 0)
                ? product.images[0]
                : "main.jpg";
              const imagePath = `https://messerschmiede-schwaiger.at/api/images/${product.image}/${fileName}`;

              return (
                <Link
                  key={product.id}
                  to={`/produkte/${product.id}`}
                  className="group bg-neutral-900 border border-amber-900/20 hover:border-amber-600/50 transition-all overflow-hidden flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-neutral-800">
                    <img
                      src={imagePath}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('placeholder')) {
                          target.src = "https://via.placeholder.com/600x600.png?text=Bild+nicht+gefunden";
                        }
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-amber-600 text-xs uppercase tracking-wide mb-2">{product.category}</p>
                    <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors">{product.name}</h3>
                    <p className="text-2xl text-amber-500 font-serif">
                      €{Number(product.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceLink
            to="/schleifservice"
            icon={<Scissors size={32} />}
            title="Schleifservice"
            desc="Professionelles Schleifen für rasiermesserscharfe Ergebnisse."
          />
          <ServiceLink
            to="/härteservice"
            icon={<Zap size={32} />}
            title="Härteservice"
            desc="Hochpräzise Wärmebehandlung für Ihre eigenen Klingen."
          />
        </div>
      </section>
    </div>
  );
}

// Hilfskomponenten
function FeatureCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-900/20 rounded-full mb-8 group-hover:bg-amber-900/40 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl text-amber-500 mb-4 uppercase tracking-widest">{title}</h3>
      <p className="text-neutral-400 leading-relaxed text-sm">{text}</p>
    </div>
  );
}

function ServiceLink({ to, icon, title, desc }: { to: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Link to={to} className="group flex flex-col justify-between bg-neutral-950 border border-amber-900/20 hover:border-amber-600/50 transition-all p-8 h-full">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-amber-900/30 flex items-center justify-center rounded-full text-amber-500">
            {icon}
          </div>
          <h3 className="text-2xl text-amber-500 uppercase tracking-wide">{title}</h3>
        </div>
        <p className="text-neutral-300 mb-6">{desc}</p>
      </div>

      <div className="flex justify-end">
        <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 bg-amber-600 text-black md:bg-transparent md:text-amber-500 md:border md:border-amber-600/50 md:group-hover:bg-amber-600 md:group-hover:text-black md:group-hover:translate-x-2">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}