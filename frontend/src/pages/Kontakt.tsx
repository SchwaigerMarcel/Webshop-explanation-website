import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Flame } from "lucide-react";

export function Kontakt() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-neutral-950 min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header - Zentriert */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <Flame className="text-amber-500 w-12 h-12 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter">
                        Kontakt <span className="text-amber-500">aufnehmen</span>
                    </h1>
                    <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
                        Haben Sie Fragen zu unseren Messern oder wünschen Sie eine individuelle Anfertigung? Wir freuen uns auf Ihre Nachricht.
                    </p>
                </motion.div>

                {/* Content Container - Alles untereinander und zentriert */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-12"
                >
                    
                    {/* 1. Kontakt-Info Karten - Zentriertes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {[
                            { icon: Phone, label: "Telefon", val: "+43 677 63547 065", href: "tel:+4367763547065" },
                            { icon: Mail, label: "E-Mail", val: "info@messerschmiede-schwaiger.at", href: "mailto:info@messerschmiede-schwaiger.at" },
                            { icon: MapPin, label: "Werkstatt", val: "Schwaigaustraße 119, 4030 Linz", href: "https://maps.google.com/?q=Schwaigaustraße+119,+4030+Linz" },
                            { icon: Clock, label: "Öffnungszeiten", val: "Mo-Fr: Nach Vereinbarung", href: "#" }
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                variants={itemVariants}
                                whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.5)" }}
                                className="p-6 bg-neutral-900 border border-amber-900/20 rounded-sm transition-colors group text-center flex flex-col items-center"
                            >
                                <item.icon className="text-amber-500 w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                                <p className="text-xs uppercase tracking-widest text-amber-600 mb-1">{item.label}</p>
                                <p className="text-neutral-200 font-medium break-words">{item.val}</p>
                            </motion.a>
                        ))}
                    </div>

                    {/* 3. Google Maps - Full Width & Normal Look */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full h-[400px] bg-neutral-900 border border-amber-900/20 relative overflow-hidden shadow-2xl"
                    >
                        <iframe
                            title="Messerschmiede Schwaiger Standort"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d569.5220842160122!2d14.388352677009257!3d48.24695908048685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773bc5d4d44ec55%3A0x75aa0fc0b5ae9dd3!2sSchwaigaustra%C3%9Fe%20119%2C%204030%20Linz!5e1!3m2!1sde!2sat!4v1774096620728!5m2!1sde!2sat" 
                            width="100%"
                            height="100%"
                            style={{ border: 0 }} 
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-0 contrast-100 brightness-100"
                        />
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}