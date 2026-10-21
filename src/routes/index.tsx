import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { submitBookingRequest } from "@/lib/booking.functions";
import hero from "@/assets/hero.jpg";
import room from "@/assets/room.jpg";
import products from "@/assets/products.jpg";
import facial from "@/assets/facial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Dimpho Skin & Beauty — Personalised Skincare" },
      { name: "description", content: "Facials, skincare consultations, somatology treatments and cosmetics with Dimpho. Book your appointment." },
      { property: "og:title", content: "Maison Dimpho Skin & Beauty" },
      { property: "og:description", content: "Personalised skincare, somatology and cosmetics. Book your appointment with Dimpho." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- EDITABLE CONTENT: replace placeholders with Dimpho's real details ---------- */
const CONTACT = {
  phone: "[Phone number]",
  whatsapp: "", // e.g. "27821234567" (country code, no +)
  email: "[Email address]",
  address: "[Studio address]",
  hours: "[Opening hours]",
  instagram: "#",
  facebook: "#",
  tiktok: "#",
};

const SERVICES = [
  { title: "Facials", desc: "[Describe the facial treatments offered.]", price: "From R[price]", img: facial },
  { title: "Skincare Consultations", desc: "[Describe what a consultation includes.]", price: "R[price]", img: hero },
  { title: "Somatology Treatments", desc: "[List the confirmed somatology treatments.]", price: "From R[price]", img: room },
  { title: "Cosmetics", desc: "[Describe cosmetic services or makeup offered.]", price: "From R[price]", img: products },
];

const PRODUCTS = [
  { name: "[Product name]", type: "[Cleanser]", price: "R[price]" },
  { name: "[Product name]", type: "[Serum]", price: "R[price]" },
  { name: "[Product name]", type: "[Moisturiser]", price: "R[price]" },
];

const GALLERY = [
  { src: room, alt: "Treatment room" },
  { src: products, alt: "Skincare products" },
  { src: facial, alt: "Facial treatment" },
  { src: hero, alt: "Glowing skin" },
];
/* -------------------------------------------------------------------------------------- */

const NAV = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Philosophy", "#philosophy"],
  ["Products", "#products"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

const waLink = (msg = "Hello Dimpho, I'd like to book an appointment.") =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}` : "#contact";

const btn =
  "inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-500";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-gold`;
const btnOutline = `${btn} border border-primary/40 text-foreground hover:border-gold hover:text-gold`;

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="font-display text-2xl tracking-wide">
            Maison <span className="italic text-gold">Dimpho</span>
          </a>
          <nav className="hidden gap-8 lg:flex">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold">{l}</a>
            ))}
          </nav>
          <a href="#contact" className={`${btnPrimary} hidden !px-6 !py-3 lg:inline-flex`}>Book</a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden text-xs uppercase tracking-[0.2em]">
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-5 border-t border-border bg-background px-6 py-6 lg:hidden">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="font-display text-2xl">{l}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className={btnPrimary}>Book an Appointment</a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-28 pb-16 lg:grid-cols-2">
        <div className="fade-up">
          <p className="eyebrow mb-6">Skin · Somatology · Cosmetics</p>
          <h1 className="text-5xl leading-[1.05] md:text-7xl">
            Skin care, <br /><em className="text-gold">thoughtfully</em> personal.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Maison Dimpho is a calm space for considered skincare and beauty rituals — tailored to you, your skin and how you want to feel.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className={btnPrimary}>Book an Appointment</a>
            <a href="#services" className={btnOutline}>View Services</a>
          </div>
        </div>
        <div className="relative fade-up [animation-delay:200ms]">
          <div className="absolute -left-6 -top-6 hidden h-full w-full border border-gold/40 md:block" />
          <img src={hero} alt="Glowing, radiant skin" width={1024} height={1280} className="relative aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-secondary/60 py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
          <img src={room} alt="Maison Dimpho treatment room" loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover" />
          <div>
            <p className="eyebrow mb-4">Meet the founder</p>
            <h2 className="text-4xl md:text-5xl">Hello, I'm <em className="text-gold">Dimpho</em>.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Skincare and beauty have always been my passion. I created Maison Dimpho to offer a welcoming space where every client is listened to, cared for and given time.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              [Add Dimpho's personal story, background and confirmed qualifications here.]
            </p>
            <p className="mt-8 font-display text-2xl italic">— Dimpho</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-16 text-center">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl">Treatments &amp; rituals</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article key={s.title} className="group bg-card">
              <div className="overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-gold">{s.price}</span>
                  <a href="#contact" className="text-xs uppercase tracking-[0.2em] transition-colors hover:text-gold">Book →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="bg-primary py-28 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow mb-6">Our philosophy</p>
          <h2 className="text-4xl leading-tight md:text-6xl">
            Your skin, your story — cared for with <em className="text-gold">intention</em>.
          </h2>
          <div className="mt-16 grid gap-10 text-left md:grid-cols-3">
            {[
              ["Personalised", "Every treatment begins with listening, so your care reflects your skin and your goals."],
              ["Self-care", "Time set aside for you — a calm, unhurried ritual to rest and reset."],
              ["Confidence", "Supporting you to feel comfortable and confident in your own skin."],
            ].map(([t, d], i) => (
              <div key={t} className="border-t border-gold/40 pt-6">
                <span className="font-display text-gold">0{i + 1}</span>
                <h3 className="mt-2 text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">The collection</p>
            <h2 className="text-4xl md:text-5xl">Beauty &amp; skincare products</h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              A considered edit of products to continue your ritual at home. [Update with the products Dimpho stocks.]
            </p>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {PRODUCTS.map((p, i) => (
                <li key={i} className="group flex items-center justify-between py-5">
                  <div>
                    <p className="eyebrow !text-muted-foreground">{p.type}</p>
                    <p className="mt-1 font-display text-2xl transition-colors group-hover:text-gold">{p.name}</p>
                  </div>
                  <span className="text-sm text-gold">{p.price}</span>
                </li>
              ))}
            </ul>
            <a href={waLink("Hello Dimpho, I'd like to ask about your products.")} className={`${btnOutline} mt-10`}>Enquire about products</a>
          </div>
          <img src={products} alt="Skincare product collection" loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover" />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-secondary/60 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="text-4xl md:text-5xl">Inside the maison</h2>
            <p className="mt-4 text-sm text-muted-foreground">Temporary images — replace with studio photos and approved client results.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.map((g, i) => (
              <div key={i} className={`overflow-hidden ${i % 2 ? "md:mt-12" : ""}`}>
                <img src={g.src} alt={g.alt} loading="lazy" width={1024} height={1024} className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      {/* Footer */}
      <footer className="border-t border-border bg-ivory py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl">Maison <span className="italic text-gold">Dimpho</span></p>
            <p className="mt-2 eyebrow">Skin &amp; Beauty</p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{CONTACT.address}</p>
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.email}</p>
          </div>
          <Socials />
        </div>
        <p className="mx-auto mt-12 max-w-7xl px-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Maison Dimpho Skin &amp; Beauty</p>
      </footer>
    </div>
  );
}

function Socials() {
  return (
    <div className="flex gap-6 text-xs uppercase tracking-[0.2em]">
      {[["Instagram", CONTACT.instagram], ["Facebook", CONTACT.facebook], ["TikTok", CONTACT.tiktok]].map(([l, h]) => (
        <a key={l} href={h} className="transition-colors hover:text-gold">{l}</a>
      ))}
    </div>
  );
}

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().min(6, "Please enter a contact number").max(30),
  service: z.string().min(1, "Please choose a service"),
  date: z.string().max(20).optional(),
  message: z.string().trim().max(1000).optional(),
});

function Contact() {
  const submitFn = useServerFn(submitBookingRequest);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setSending(true);
    setSendError(null);
    const v = r.data;
    // The success screen only appears once the enquiry has actually been
    // handed off — stored server-side, and the WhatsApp message opened when
    // WhatsApp booking is set up.
    let stored = false;
    let failure: string | null = null;
    try {
      const res = await submitFn({ data: v });
      stored = res.ok;
      if (!res.ok) failure = res.error;
    } catch {
      failure = "Sorry — your enquiry didn't go through. Please try again, or contact Dimpho directly using the details on the left.";
    }
    setSending(false);
    if (!stored) {
      setSendError(failure);
      return;
    }
    const msg = `Hello Dimpho, I'd like to book an appointment.\nName: ${v.name}\nPhone: ${v.phone}\nService: ${v.service}\nPreferred date: ${v.date || "-"}\n${v.message || ""}`;
    if (CONTACT.whatsapp) window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  };

  const field = "w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-gold";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Book &amp; contact</p>
          <h2 className="text-4xl md:text-5xl">Reserve your <em className="text-gold">moment</em>.</h2>
          {CONTACT.whatsapp ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Sending the enquiry form opens WhatsApp with your details already filled in — just press send, and Dimpho will confirm your time.
            </p>
          ) : (
            <p className="mt-4 border-l-2 border-gold/60 pl-4 text-sm leading-relaxed text-muted-foreground">
              WhatsApp booking isn't set up yet. Please send your enquiry with the form instead — it reaches Dimpho directly and she'll confirm your appointment.
            </p>
          )}
          <ol className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>1. {CONTACT.whatsapp ? "Send the enquiry form — it opens WhatsApp with your details." : "Fill in the enquiry form."}</li>
            <li>2. Dimpho will confirm your time and treatment.</li>
            <li>3. Arrive, relax, and enjoy.</li>
          </ol>
          {CONTACT.whatsapp ? (
            <a href={waLink()} target="_blank" rel="noopener" className={`${btnPrimary} mt-10`}>Book on WhatsApp</a>
          ) : (
            <a href="#appointment-form" className={`${btnPrimary} mt-10`}>Send an enquiry</a>
          )}
          <dl className="mt-12 grid grid-cols-2 gap-6 text-sm">
            {[["Phone", CONTACT.phone], ["Email", CONTACT.email], ["Studio", CONTACT.address], ["Hours", CONTACT.hours]].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow mb-1">{k}</dt>
                <dd className="text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10"><Socials /></div>
        </div>

        <div id="appointment-form" className="bg-card p-8 md:p-12">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h3 className="text-3xl">Thank you</h3>
              <p className="mt-4 text-muted-foreground">Your enquiry is ready. Dimpho will be in touch to confirm your appointment.</p>
              <button onClick={() => setSent(false)} className={`${btnOutline} mt-8`}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6" noValidate>
              <h3 className="text-3xl">Appointment enquiry</h3>
              {([["name", "Full name", "text"], ["phone", "Phone number", "tel"]] as const).map(([n, l, t]) => (
                <div key={n}>
                  <input name={n} type={t} placeholder={l} maxLength={100} className={field} />
                  {errors[n] && <p className="mt-1 text-xs text-destructive">{errors[n]}</p>}
                </div>
              ))}
              <div>
                <select name="service" defaultValue="" className={field}>
                  <option value="" disabled>Choose a service</option>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                  <option>Not sure yet</option>
                </select>
                {errors["service"] && <p className="mt-1 text-xs text-destructive">{errors["service"]}</p>}
              </div>
              <input name="date" type="date" className={field} />
              <textarea name="message" rows={3} placeholder="Anything Dimpho should know?" maxLength={1000} className={field} />
              <button type="submit" className={`${btnPrimary} w-full`}>Send enquiry</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
