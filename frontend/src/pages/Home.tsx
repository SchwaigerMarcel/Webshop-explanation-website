import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// HINZUGEFÜGT: Scissors und Zap. ENTFERNT: Loader2 (da ungenutzt)
import { Flame, Hammer, Award, ArrowRight, Scissors, Zap } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string | number;
  description: string;
  category: string;
  image: string;
}

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  // 'loading' wurde entfernt, da es im JSX unten nicht verwendet wurde

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
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
          <img
            src="../../public/Schmiede.jpg"
            alt="Schmiede"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-0 sm:px-4">
          {/* px-0 für ganz kleine Handys, damit wir die volle Breite nutzen */}

          <div className="flex flex-col items-center justify-center text-center w-full">
            <Flame className="text-amber-500 w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-6 shrink-0" />

            <h1 className="font-serif text-white mb-6 leading-[1.1] uppercase w-full
                   /* Wir nutzen 'break-words' und entfernen negatives Letter-Spacing */
                   break-words tracking-tighter sm:tracking-wide
                   /* Fluide Größe: 9.5% der Breite, aber auf kleinsten Geräten etwas kleiner */
                   text-[9.5vw] sm:text-[7vw] lg:text-7xl">
              Handgeschmiedete
              <br className="block sm:hidden md:block" />
              <span className="text-amber-500"> Meisterwerke</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-neutral-300 mb-8 max-w-[90%] sm:max-w-2xl mx-auto leading-relaxed">
              Jedes Messer ein Unikat. <br className="xs:hidden" />
              Geschmiedet mit Leidenschaft.
            </p>

            <div className="flex justify-center w-full px-4">
              <Link
                to="/produkte"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white 
                   px-5 py-3 md:px-8 md:py-4 uppercase tracking-wide transition-all 
                   text-xs sm:text-base whitespace-nowrap shadow-xl"
              >
                Messer entdecken <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Jetzt nur auf PC sichtbar (hidden md:block) */}
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
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/produkte/${product.id}`}
                className="group bg-neutral-900 border border-amber-900/20 hover:border-amber-600/50 transition-all overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
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
                <div className="p-6">
                  <p className="text-amber-600 text-xs uppercase tracking-wide mb-2">{product.category}</p>
                  <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors">{product.name}</h3>
                  <p className="text-2xl text-amber-500">€{product.price}</p>
                </div>
              </Link>
            ))}
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

// Hilfskomponenten für sauberen Code
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
    <Link to={to} className="group bg-neutral-950 border border-amber-900/20 hover:border-amber-600/50 transition-all p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-amber-900/30 flex items-center justify-center rounded-full text-amber-500">
          {icon}
        </div>
        <h3 className="text-2xl text-amber-500 uppercase tracking-wide">{title}</h3>
      </div>
      <p className="text-neutral-300 mb-6">{desc}</p>
      <div className="flex justify-end italic text-amber-500 group-hover:translate-x-2 transition-transform">
        <ArrowRight />
      </div>
    </Link>
  );
}