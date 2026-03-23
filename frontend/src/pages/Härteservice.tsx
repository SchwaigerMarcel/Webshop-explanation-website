import { motion } from "motion/react";
import { Zap, ThermometerSun, Shield, Wrench, CheckCircle, Sparkles, Users, Award, Clock } from "lucide-react";

export function Härteservice() {
  return (
    <div className="bg-neutral-950">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/api/images/page/härteservice.jpg"
            alt="Härteofen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6 inline-block"
          >
            <Zap className="text-amber-500 w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-amber-500 mb-4 sm:mb-6 leading-tight"
          >
            HÄRTSERVICE
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto px-2"
          >
            Professionelle Wärmebehandlung für Hobby-Schmiede
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
              Sie schmieden Ihre eigenen Messer, aber haben keinen Zugang zu professionellen Härteöfen? Wir übernehmen die Wärmebehandlung Ihrer Klingen mit höchster Präzision.
            </p>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              Mit unseren hochpräzisen Härteöfen (±2°C Genauigkeit) garantieren wir optimale Ergebnisse für jeden Stahltyp. Ihre Arbeit verdient die beste Härtung!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 sm:py-20 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center"
          >
            MODERNSTE TECHNIK
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/30 rounded-full flex-shrink-0">
                  <ThermometerSun className="text-amber-500 w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide">
                  Hochpräzisions-Härteöfen
                </h3>
              </div>

              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">
                Unsere computergesteuerten Härteöfen garantieren eine Temperaturgenauigkeit von ±2°C. Das ist entscheidend für optimale Härte und Zähigkeit.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Präzise Temperaturregelung mit Digitalsteuerung</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Gleichmäßige Wärmeverteilung im gesamten Ofen</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Programmierbare Härtekurven für jeden Stahl</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Schutzgasatmosphäre für verzunderungsfreie Oberflächen</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/30 rounded-full flex-shrink-0">
                  <Sparkles className="text-amber-500 w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide">
                  Optimale Ergebnisse
                </h3>
              </div>

              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">
                Die richtige Härtetemperatur und Haltezeit sind entscheidend. Wir kennen die optimalen Parameter für alle gängigen Klingenstähle.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">HRC 58-62 für rostfreie Stähle</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">HRC 62-65 für Kohlenstoffstähle</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Minimaler Verzug durch kontrollierte Abkühlung</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Mehrfaches Anlassen für optimale Zähigkeit</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center"
          >
            UNSER SERVICE UMFASST
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: ThermometerSun,
                title: "Präzise Härtung",
                desc: "Exakte Temperaturführung nach Stahlsorte",
                delay: 0.1
              },
              {
                icon: Wrench,
                title: "Anlassen inklusive",
                desc: "2-3x Anlassen für optimale Zähigkeit",
                delay: 0.2
              },
              {
                icon: Shield,
                title: "Verzugsminimierung",
                desc: "Profi-Techniken für minimalen Verzug",
                delay: 0.3
              },
              {
                icon: Sparkles,
                title: "Oberflächenschutz",
                desc: "Schutzgasatmosphäre verhindert Verzunderung",
                delay: 0.4
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -8 }}
                className="bg-neutral-950 border border-amber-900/20 p-6 hover:border-amber-600/50 transition-all text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/30 rounded-full mb-4"
                >
                  <item.icon className="text-amber-500 w-7 h-7" />
                </motion.div>
                <h3 className="text-base sm:text-lg text-amber-500 mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Steels */}
      <section className="py-12 sm:py-20 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-8 sm:mb-12 text-center"
          >
            UNTERSTÜTZTE STAHLSORTEN
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg sm:text-xl text-amber-500 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Rostfreie Stähle
                </h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-neutral-300">• 440C, AUS-8, AUS-10</p>
                  <p className="text-neutral-300">• N690, 14C28N, Sandvik 12C27</p>
                  <p className="text-neutral-300">• VG-10, VG-1, AEB-L</p>
                  <p className="text-neutral-300">• CPM-S30V, CPM-S35VN</p>
                  <p className="text-neutral-300">• D2 (halbrostfrei)</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl text-amber-500 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Kohlenstoffstähle
                </h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-neutral-300">• 1075, 1084, 1095</p>
                  <p className="text-neutral-300">• O1, O2 (Werkzeugstähle)</p>
                  <p className="text-neutral-300">• 52100 (Wälzlagerstahl)</p>
                  <p className="text-neutral-300">• W1, W2 (Wasserhärtestähle)</p>
                  <p className="text-neutral-300">• 5160, 1060 (Federstähle)</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-neutral-950 border border-amber-900/10">
              <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-wide mb-2">Hinweis:</p>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Weitere Stahlsorten auf Anfrage. Bitte geben Sie bei Ihrer Anfrage die genaue Stahlbezeichnung an, damit wir die optimale Härtekurve anwenden können.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center"
          >
            SO FUNKTIONIERT'S
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                icon: Users,
                title: "Anfrage stellen",
                desc: "Kontaktieren Sie uns mit Stahlsorte, Anzahl und Abmessungen der Klingen"
              },
              {
                step: "2",
                icon: ThermometerSun,
                title: "Angebot erhalten",
                desc: "Wir erstellen ein individuelles Angebot basierend auf Ihren Anforderungen"
              },
              {
                step: "3",
                icon: Zap,
                title: "Klingen einsenden",
                desc: "Senden Sie Ihre vorgeschliffenen Klingen sicher verpackt zu uns"
              },
              {
                step: "4",
                icon: Award,
                title: "Gehärtete Klingen",
                desc: "Sie erhalten Ihre professionell gehärteten Klingen zurück"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-amber-900/30 rounded-full">
                    <item.icon className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg text-amber-500 mb-3 uppercase tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-neutral-950 border border-amber-600/30 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <Clock className="text-amber-500 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl text-amber-500 mb-2 uppercase tracking-wide">Bearbeitungszeit</h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  In der Regel 5-7 Werktage ab Erhalt Ihrer Klingen. Express-Service nach Absprache möglich.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-20 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center"
          >
            WARUM PROFESSIONELL HÄRTEN?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Keine teure Ausrüstung nötig",
                desc: "Härteöfen kosten mehrere tausend Euro. Nutzen Sie unsere Profi-Ausrüstung nur wenn Sie sie brauchen.",
                icon: ThermometerSun
              },
              {
                title: "Reproduzierbare Ergebnisse",
                desc: "Gleiche Qualität bei jeder Härtung. Keine Experimente mehr mit Koksschmieden oder Gasbrennern.",
                icon: Award
              },
              {
                title: "Minimaler Verzug",
                desc: "Unsere kontrollierten Abkühlprozesse minimieren Verzug. Weniger Nacharbeit für Sie.",
                icon: Shield
              },
              {
                title: "Optimale Härte",
                desc: "Jeder Stahl braucht seine spezifische Temperatur. Wir kennen die Parameter für alle gängigen Stähle.",
                icon: Sparkles
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-900/30 rounded-full flex-shrink-0">
                    <item.icon className="text-amber-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl text-amber-500 mb-2 uppercase tracking-wide">{item.title}</h3>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Zap className="text-amber-500 w-16 h-16 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-4 sm:mb-6">
              BEREIT FÜR PROFESSIONELLE HÄRTUNG?
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 mb-6 sm:mb-8 px-2">
              Kontaktieren Sie uns für ein individuelles Angebot. Bitte geben Sie Stahlsorte, Anzahl und Abmessungen Ihrer Klingen an.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@schwaiger-messer.de?subject=Anfrage Härtservice"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-wide transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
              >
                Angebot anfragen
              </a>
              <a
                href="tel:+4986529876543"
                className="inline-block border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-wide transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
              >
                Beratung anrufen
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
