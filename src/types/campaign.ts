export interface BrandTheme {
  primary: string;
  accent: string;
  background: string;
  text: string;
}

export interface ProductInfo {
  name: string;
  tagline: string;
  description: string;
  audience: string;
  price: string;
  callToAction: string;
  features: [string, string, string];
}

export interface ReelContent {
  hook: string;
  featureLabels: [string, string, string];
  cta: string;
  voiceover: string;
}

export interface PosterContent {
  badge: string;
  headline: string;
  subheadline: string;
  cta: string;
}

export interface CarouselSlide {
  title: string;
  body: string;
  kicker: string;
}

export interface SocialCopy {
  instagram: string;
  linkedin: string;
  hashtags: string[];
}

export interface ScheduleItem {
  day: string;
  channel: string;
  content: string;
  status: "Planned" | "Draft" | "Ready";
}

export interface CampaignData {
  product: ProductInfo;
  brandTheme: BrandTheme;
  reel: ReelContent;
  poster: PosterContent;
  carouselSlides: CarouselSlide[];
  socialCopy: SocialCopy;
  suggestedSchedule: ScheduleItem[];
}

export const defaultCampaign: CampaignData = {
  product: {
    name: "AURA Bottle",
    tagline: "Hydration, reimagined.",
    description: "A sleek insulated bottle designed to keep your everyday rituals refreshing.",
    audience: "Design-conscious everyday explorers",
    price: "₹1,299",
    callToAction: "Shop the drop",
    features: ["24-hour cold", "Leak-proof design", "Planet-friendly"],
  },
  brandTheme: { primary: "#8B5CF6", accent: "#C4F566", background: "#101323", text: "#F8FAFC" },
  reel: {
    hook: "MAKE EVERY SIP\nA STATEMENT.",
    featureLabels: ["24H COLD", "LEAK-PROOF", "MADE TO REUSE"],
    cta: "MEET YOUR NEW DAILY ICON",
    voiceover: "Meet the AURA Bottle. Your drink stays refreshingly cold for up to 24 hours, with a leak-proof design made for life on the move. Less single-use. More everyday impact. Make every sip a statement. Shop the drop today.",
  },
  poster: { badge: "THE EVERYDAY UPGRADE", headline: "HYDRATION.\nELEVATED.", subheadline: "Your new favourite sidekick is here.", cta: "SHOP THE DROP" },
  carouselSlides: [
    { kicker: "01 / THE INTRO", title: "Meet your new daily icon.", body: "Good design should make everyday routines feel a little more extraordinary." },
    { kicker: "02 / THE BENEFIT", title: "Cold that lasts.", body: "Keep your favourite drinks refreshingly cold for up to 24 hours." },
    { kicker: "03 / THE DESIGN", title: "Built for the in-between.", body: "A considered silhouette, a secure lid, and a bottle that goes where you go." },
    { kicker: "04 / THE IMPACT", title: "Refill. Repeat. Feel good.", body: "Choose a reusable ritual and reduce your reliance on single-use bottles." },
    { kicker: "05 / THE CTA", title: "Your next sip starts here.", body: "Find your colour, fill it up, and take AURA along for the ride." }
  ],
  socialCopy: {
    instagram: "Meet AURA — hydration with a little more intention. ✨ Cold drinks, considered design, and a reusable routine made for wherever the day takes you. Your everyday upgrade starts here.",
    linkedin: "Introducing AURA Bottle: a thoughtfully designed hydration essential that brings together everyday utility, considered design, and reusable habits. Built for people who want their daily essentials to work beautifully and feel better to use.",
    hashtags: ["#AURABottle", "#EverydayUpgrade", "#HydrationGoals", "#ReusableDesign", "#ProductLaunch", "#LifestyleEssentials", "#ShopSmall"]
  },
  suggestedSchedule: [
    { day: "Day 1 · Mon", channel: "Instagram Reel", content: "Launch teaser: reveal the product and hook", status: "Ready" },
    { day: "Day 2 · Tue", channel: "Instagram Stories", content: "Poll: choose your everyday colour", status: "Draft" },
    { day: "Day 3 · Wed", channel: "Instagram Carousel", content: "Educate on benefits and product details", status: "Planned" },
    { day: "Day 4 · Thu", channel: "LinkedIn", content: "Share the design story and product purpose", status: "Planned" },
    { day: "Day 5 · Fri", channel: "Instagram Reel", content: "Feature-led product demo", status: "Planned" },
    { day: "Day 6 · Sat", channel: "Stories", content: "Answer FAQs and invite questions", status: "Draft" },
    { day: "Day 7 · Sun", channel: "Instagram Feed", content: "Last-call reminder with launch offer", status: "Planned" }
  ]
};