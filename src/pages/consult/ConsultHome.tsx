import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/Button";
import { ExperiencePhoto } from "@/components/ExperiencePhoto";
import { ManagedContentSections } from "@/components/ManagedContentSections";
import { useManagedHero } from "@/hooks/useManagedHero";
import { IH_LINK_LOGO } from "@/assets/ihlinkLogo";
import { consultServices, SectionTitle, ServiceCard } from "./consultShared";
export function ConsultHome() {
  const hero = useManagedHero("consult");
  return (
    <PageShell product="consult">
      <section className="relative overflow-hidden bg-navy-900 text-white px-6 lg:px-12 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,.28),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(249,115,22,.2),transparent_30%)]" />
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-sm font-semibold border border-white/10">
              {hero?.eyebrow || "Software • AI • Cloud • Engineering"}
            </span>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mt-6">
              {hero?.title || "Engineering intelligent solutions for the digital and physical world."}
            </h1>
            <p className="text-lg text-white/70 mt-6 max-w-xl">
              {hero?.body || "IHLink combines computing, artificial intelligence and computer engineering to solve real business and industrial challenges."}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to={hero?.cta_link || "/consult/quote"}>
                <Button
                  size="xl"
                  themeClass="bg-gradient-to-r from-orange-500 to-pink-600"
                  rightIcon={<ArrowRight />}
                >
                  {hero?.cta_label || "Start a Project"}
                </Button>
              </Link>
              <Link to="/consult/portfolio">
                <Button size="xl" variant="secondary" leftIcon={<PlayCircle />}>
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
          <div><figure className="mb-6"><div role="img" aria-label="IHLink Consult branded service illustration" className="aspect-[4/3] rounded-2xl bg-no-repeat" style={{backgroundImage:'url(/images/ihlink-service-scene.webp)',backgroundSize:'270% auto',backgroundPosition:'53% 22%'}}/><figcaption className="mt-2 text-xs text-white/60">IHLink service illustration.</figcaption></figure><div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"><img src={IH_LINK_LOGO} alt="IHLink" className="h-11 w-11 rounded-xl bg-white object-contain p-1"/><div><b className="block">IHLink Consult</b><span className="text-xs text-white/60">Software • AI • Cloud</span></div></div><div className="grid grid-cols-2 gap-4">
            {[
              "Software & Product Engineering",
              "AI, Data & Automation",
              "Cloud, DevOps & Infrastructure",
              "Computer Engineering & IoT",
            ].map((x, i) => (
              <div
                key={x}
                className={`rounded-2xl p-6 border border-white/10 ${i === 0 || i === 3 ? "bg-gradient-to-br from-orange-500/30 to-pink-600/20" : "bg-white/5"}`}
              >
                <CheckCircle2 className="text-orange-400" />
                <p className="font-bold mt-8">{x}</p>
              </div>
            ))}
          </div></div>
        </div>
      </section>
      <ExperiencePhoto src={hero?.image_url || "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85"} alt="A software engineer working with code across multiple screens" eyebrow="Software and AI expertise" title="Work directly with specialists who understand your technical goals" text="We bring strategy, software, AI and cloud expertise together so your project moves from conversation to a useful, maintainable solution." accentClass="text-orange-600" />
      <section className="px-6 lg:px-12 py-16 lg:py-20">
        <SectionTitle
          eyebrow="What we build"
          title="One technical partner. Many possibilities."
          text="From an idea to a deployed and supported solution, our specialists work across software and engineering disciplines."
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {consultServices.map((x) => (
            <ServiceCard key={x.title} item={x} />
          ))}
        </div>
      </section>
      <ManagedContentSections pageKey="consult" />
    </PageShell>
  );
}
