"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Sparkles, Coins, ArrowRight, CheckCircle2, Upload,
  Camera, Home, Calculator, Users, Wrench, MessageSquare,
  LayoutDashboard, Package, Activity, Palette, HelpCircle,
  ChevronRight, Star, Zap, Gift, TrendingUp, Shield,
  Clock, FileText, Phone, MapPin, Loader2, X, Plus,
  RotateCcw, Check, AlertCircle, RefreshCw, IndianRupee,
  Flame, Award, Lock, Unlock, Building, ChevronDown, Send,
  Info,
} from "lucide-react";
import { fetchLivePrices, ALL_CITIES, PriceFetchResult } from "@/lib/priceEngine";

// ── Types ──────────────────────────────────────────────────────────────────
type BotId =
  | "sketch3d" | "costbot" | "contractorbot" | "renovationbot" | "leadbot"
  | "planbot" | "materialbot" | "progressbot" | "interiorbot" | "qabot";

interface Msg { role: "user" | "bot"; text: string; ts?: string }
interface CoinsState {
  balance: number;
  dailyClaimed: boolean;
  profileDone: boolean;
  reviewDone: boolean;
  history: { label: string; amount: number; ts: string }[];
}

// ── Coins helpers ──────────────────────────────────────────────────────────
const COINS_KEY = "skov_coins_v2";
const TODAY = new Date().toDateString();

function loadCoins(): CoinsState {
  if (typeof window === "undefined") return defaultCoins();
  try {
    const raw = localStorage.getItem(COINS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultCoins();
}
function defaultCoins(): CoinsState {
  return { balance: 0, dailyClaimed: false, profileDone: false, reviewDone: false, history: [] };
}
function saveCoins(s: CoinsState) {
  if (typeof window !== "undefined") localStorage.setItem(COINS_KEY, JSON.stringify(s));
}

// ── Bot Definitions ────────────────────────────────────────────────────────
const BOTS = [
  { id: "sketch3d" as BotId, icon: Camera, label: "Sketch → 3D Home Bot", tag: "Magical", tagColor: "text-purple-400", category: "core" },
  { id: "costbot" as BotId, icon: Calculator, label: "Construction Cost Bot", tag: "High Intent", tagColor: "text-green-400", category: "core" },
  { id: "contractorbot" as BotId, icon: Users, label: "Contractor Match Bot", tag: "Conversion", tagColor: "text-blue-400", category: "core" },
  { id: "renovationbot" as BotId, icon: Wrench, label: "Renovation Advisor", tag: "Engagement", tagColor: "text-orange-400", category: "core" },
  { id: "leadbot" as BotId, icon: MessageSquare, label: "Lead Qualification Bot", tag: "+50 Coins", tagColor: "text-skov-gold", category: "core" },
  { id: "planbot" as BotId, icon: LayoutDashboard, label: "House Plan Assistant", tag: "Daily Use", tagColor: "text-cyan-400", category: "daily" },
  { id: "materialbot" as BotId, icon: Package, label: "Material Budget Bot", tag: "Live Prices", tagColor: "text-skov-gold", category: "daily" },
  { id: "progressbot" as BotId, icon: Activity, label: "Site Progress Bot", tag: "Track", tagColor: "text-teal-400", category: "daily" },
  { id: "interiorbot" as BotId, icon: Palette, label: "Interior Style Bot", tag: "Design", tagColor: "text-pink-400", category: "daily" },
  { id: "qabot" as BotId, icon: HelpCircle, label: "Contractor Q&A Bot", tag: "Hinglish", tagColor: "text-amber-400", category: "daily" },
] as const;

// ── Priority Cities — Chhattisgarh first ───────────────────────────────────
const PRIORITY_CITIES = [
  "Raipur", "Bhilai", "Durg", "Bilaspur", "Baloda Bazar", "Kawardha",
];
const OTHER_CITIES = [
  "Korba", "Nagpur", "Bhopal", "Indore", "Mumbai", "Delhi",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
];

// ── Earn / Redeem Data ─────────────────────────────────────────────────────
const EARN_ACTIONS = [
  { id: "daily", icon: Flame, label: "Daily Login", coins: 5, desc: "Check in every day" },
  { id: "profile", icon: Shield, label: "Complete Profile", coins: 50, desc: "Add your name, phone & city" },
  { id: "upload", icon: Upload, label: "Upload Project Req.", coins: 20, desc: "Submit your project details" },
  { id: "ref_contractor", icon: Users, label: "Refer a Contractor", coins: 100, desc: "Refer a verified contractor" },
  { id: "ref_owner", icon: Home, label: "Refer Property Owner", coins: 100, desc: "Refer a homeowner" },
  { id: "review", icon: Star, label: "Review Completed Work", coins: 20, desc: "Rate a project you completed" },
];

const REDEEM_ACTIONS = [
  { id: "consult", icon: Clock, label: "15-Min Consultation", coins: 50, desc: "Book instant expert call" },
  { id: "checklist", icon: FileText, label: "Planning Checklist", coins: 100, desc: "Full construction checklist PDF" },
  { id: "cost_report", icon: TrendingUp, label: "Cost Estimate Report", coins: 200, desc: "Premium printable cost report" },
  { id: "contractor_access", icon: Phone, label: "Premium Contractor Access", coins: 300, desc: "Unlock phone numbers" },
  { id: "coupon", icon: Gift, label: "Discount Coupon", coins: 500, desc: "Partner contractor discount" },
  { id: "priority", icon: Award, label: "Priority Support", coins: 1000, desc: "Jump the queue + featured listing" },
];

// ── Vastu Data ─────────────────────────────────────────────────────────────
const VASTU_DATA = [
  { room: "Main Entrance", dir: "East / North", vastu: true },
  { room: "Master Bedroom", dir: "South-West", vastu: true },
  { room: "Kitchen", dir: "South-East", vastu: true },
  { room: "Puja Room", dir: "North-East", vastu: true },
  { room: "Bathroom", dir: "North-West", vastu: true },
  { room: "Study / Office", dir: "North / East", vastu: true },
  { room: "Living Room", dir: "North / East", vastu: true },
  { room: "Staircase", dir: "South / West", vastu: true },
];

// ── Contractor Types (honest, no fake names/ratings) ───────────────────────
const CONTRACTOR_TYPES = [
  { type: "Individual Mason / Thekedar", bestFor: "Small homes, single floor, budget builds", check: "Previous work photos, client reference, material list", risk: "Medium" },
  { type: "Small Contractor Firm", bestFor: "2-3 floor homes, standard quality, city projects", check: "Written quotation, site visit, timeline commitment, payment schedule", risk: "Low-Medium" },
  { type: "Established Builder", bestFor: "Premium homes, multi-floor, complex designs", check: "Company registration, past projects, engineer on staff, agreement", risk: "Low" },
  { type: "Interior Specialist", bestFor: "Interior fit-out, kitchen, modular work, renovation", check: "Portfolio, brand list, warranty terms, supervision plan", risk: "Low-Medium" },
  { type: "Renovation Contractor", bestFor: "Repair, remodelling, partial construction, extension", check: "Existing structure assessment, scope document, material brands", risk: "Medium" },
];

const CONTRACTOR_STATUSES = [
  { status: "Register Free", meaning: "Contractor has not applied yet", color: "text-skov-cream/50" },
  { status: "Apply for SKOV Verified", meaning: "Contractor can apply for review", color: "text-blue-400" },
  { status: "Verification Under Review", meaning: "Review is pending", color: "text-yellow-400" },
  { status: "SKOV Verified", meaning: "Approved after SKOV review", color: "text-green-400" },
  { status: "Featured Listing", meaning: "Approved and promoted after review", color: "text-skov-gold" },
];

// ── Q&A Responses — Hinglish + English + Contractor Onboarding ────────────
const QA_RESPONSES: Record<string, string> = {
  default: "Arey bhai, bahut accha sawaal hai! Construction mein sabse important hai planning — bina planning ke toh paise bhi jaayenge aur tension bhi. Kuch specific poochna ho toh batao — material, labour, foundation, contractor joining — kuch bhi!",
  plaster: "Haan bilkul sahi kaha! Plastering se pehle brick wall ko achhe se wet karna padta hai — kam se kam 6-8 ghante pehle. Warna plaster crack ho jaata hai. PPC cement use karo plastering mein OPC ke bajaye, result bahut better aata hai bhai.\n\n⚠️ This is general guidance. Final quality requires site inspection by a professional.",
  cement: "Ultratech ya Ambuja dono acche hain residential ke liye. Agar budget accha hai toh Ultratech 53 grade lo structural work ke liye. Plastering ke liye 43 grade ya PPC chalega.\n\n⚠️ Approximate rate ₹380–420 per bag depending on location. Live local supplier quotation is required for final price confirmation.",
  steel: "TMT bars ke liye Fe-500 grade lo — Tata Tiscon ya Jindal Panther best hain. Diameter: columns mein 12mm-16mm, slabs mein 8mm-10mm.\n\n⚠️ Approximate rate ₹57,000–62,000/tonne. Hamesh ISI mark wala lo bhai! Live supplier quote zaroor lo final rate ke liye.",
  foundation: "Foundation depth depend karta hai soil type pe. Normal residential ke liye 5-6 feet kaafi hai. Agar soil soft hai toh soil test zaroor karwao pehle. Raft foundation better hai black cotton soil mein, aur isolated footing normal soil mein.\n\n⚠️ Final foundation design requires structural engineer approval. Photo se structural safety certify nahi hoti.",
  water: "Curing mein pani bahut important hai bhai! Concrete daalne ke baad minimum 7 din curing karni chahiye, aur better results ke liye 28 din. Subah aur shaam dopahar mein pani daalo. Slab pe gunnybags bichha do — moisture maintain rahega.",
  roof: "RCC slab ke liye minimum 4 inch thickness rakho. M20 concrete use karo (1:1.5:3 ratio). Steel bars 6 inch spacing pe rakho. Shuttering hatane ke baad 14 din tak curing karo. Ek din mein sirf ek slab dhalo — rush mat karo!\n\n⚠️ Slab design must be approved by a structural engineer before casting.",
  tiles: "Vitrified tiles bathroom ke liye best hain — anti-skid surface lo. Living room ke liye 800x800mm ya 600x600mm size acchi lagti hai. Tile setting ke liye OPC cement + coarse sand 1:3 ratio mein lo. 2-3mm gap zaroor rakho expansion ke liye.\n\n⚠️ Tile rates vary ₹30–150/sqft depending on brand and city. Check local dealer for current rates.",
  paint: "Acrylic emulsion exterior ke liye aur interior emulsion andar ke liye. Putty pehle lagao — warna paint smooth nahi lagega. 2 coats undercoat + 2 coats topcoat minimum. Asian Paints Apex ya Berger WeatherCoat exterior ke liye acche hain.\n\n⚠️ Monsoon se pehle exterior painting karwao. Approximate rate ₹15–35/sqft including putty and labour.",
  // Contractor onboarding topics
  join: "SKOV GROUP mein contractor registration bilkul FREE hai! Steps simple hain:\n\n1️⃣ Website pe 'Join as Contractor' pe click karo\n2️⃣ Name, phone, city, work category fill karo\n3️⃣ Profile create ho jaayegi — FREE listing mil jaayegi\n4️⃣ SKOV Verified ke liye apply karo (documents chahiye)\n5️⃣ Review ke baad badge milega\n\nKoi guaranteed leads ka promise nahi hai, lekin city-wise visibility aur better trust signals milte hain.",
  verified: "SKOV Verified ek trust badge hai jo review ke baad milta hai. Iske liye:\n\n• Business documents submit karo\n• Past work photos upload karo\n• Client references do\n• Site check ho sakta hai\n\nHar contractor verified nahi hota — sirf review pass karne pe badge milta hai. Featured listing bhi available hai approved contractors ke liye.",
  leads: "SKOV GROUP mein leads guaranteed nahi hain — ye clearly bata raha hoon. Lekin benefits hain:\n\n✅ Free profile and city-wise listing\n✅ Local visibility badhti hai\n✅ Trust signals better hote hain (SKOV Verified badge)\n✅ Customers apne aap contact karte hain\n✅ Featured listing opportunity after approval\n\nBest result tab aata hai jab profile complete ho, photos achhi hon, aur reviews genuine hon.",
  documents: "SKOV Verified ke liye ye documents chahiye:\n\n📄 Business registration ya GST (if applicable)\n📄 Aadhaar / PAN for identity\n📸 Past project photos (minimum 3-5 projects)\n📞 Client references (minimum 2)\n📍 Service area details\n\nSab kuch online submit hota hai. Review mein 5-7 working days lagte hain.",
};

function getQAReply(q: string): string {
  const l = q.toLowerCase();
  if (l.includes("plaster") || l.includes("plastering")) return QA_RESPONSES.plaster;
  if (l.includes("cement") || l.includes("ciment")) return QA_RESPONSES.cement;
  if (l.includes("steel") || l.includes("rod") || l.includes("sariya") || l.includes("tmt")) return QA_RESPONSES.steel;
  if (l.includes("foundation") || l.includes("neev") || l.includes("footing")) return QA_RESPONSES.foundation;
  if (l.includes("water") || l.includes("pani") || l.includes("curing")) return QA_RESPONSES.water;
  if (l.includes("roof") || l.includes("slab") || l.includes("chhad")) return QA_RESPONSES.roof;
  if (l.includes("tile") || l.includes("floor") || l.includes("tiles")) return QA_RESPONSES.tiles;
  if (l.includes("paint") || l.includes("rang") || l.includes("colour")) return QA_RESPONSES.paint;
  if (l.includes("join") || l.includes("register") || l.includes("registration") || l.includes("contractor ban")) return QA_RESPONSES.join;
  if (l.includes("verified") || l.includes("verify") || l.includes("badge") || l.includes("trust")) return QA_RESPONSES.verified;
  if (l.includes("lead") || l.includes("customer") || l.includes("kaam") || l.includes("project mil")) return QA_RESPONSES.leads;
  if (l.includes("document") || l.includes("dastavez") || l.includes("paper") || l.includes("kyc")) return QA_RESPONSES.documents;
  return QA_RESPONSES.default;
}

// ── Interior Styles — expanded per spec ────────────────────────────────────
const INTERIOR_STYLES: Record<string, { palette: string[]; materials: string[]; lighting: string; tip: string }> = {
  "Modern": {
    palette: ["#FFFFFF", "#F5F5F5", "#212121", "#C9A45C", "#9E9E9E"],
    materials: ["Polished Concrete", "Tinted Glass", "Powder-Coat Steel", "Matte White Lacquer", "Terrazzo"],
    lighting: "Recessed LED 4000K + under-cabinet strips",
    tip: "Every item must earn its place — hide all storage behind clean lines.",
  },
  "Minimal": {
    palette: ["#FAFAFA", "#E0E0E0", "#333333", "#B0BEC5", "#ECEFF1"],
    materials: ["White Oak", "Linen Curtains", "Matte Ceramic", "Frosted Glass", "Natural Stone"],
    lighting: "Warm 3000K pendants + natural north light",
    tip: "Remove visual clutter ruthlessly. One hero piece per room, nothing more.",
  },
  "Luxury": {
    palette: ["#1A1A2E", "#C9A45C", "#FFFFFF", "#D4AF37", "#2C2C2C"],
    materials: ["Italian Marble", "Brass Fixtures", "Velvet Upholstery", "Walnut Veneer", "Crystal Accents"],
    lighting: "Chandelier 2400K + cove lighting + accent spots",
    tip: "Luxury is about material quality, not quantity. One statement wall, one hero light.",
  },
  "Traditional": {
    palette: ["#8B1A1A", "#C9A45C", "#1A3A5C", "#D4AF37", "#2C1810"],
    materials: ["Teak Wood Inlay", "Jali Marble", "Velvet Upholstery", "Brass Fixtures", "Hand-painted Tiles"],
    lighting: "Warm chandelier 2400K + brass floor lamps",
    tip: "Layer textures — carved wood + marble + rich textiles for depth.",
  },
  "Contemporary": {
    palette: ["#E8E0D5", "#7D6E63", "#4A4038", "#C9B8A8", "#2C2C2C"],
    materials: ["Natural Oak Wood", "Linen Fabric", "Wabi-sabi Ceramic", "Bamboo Accents", "Raw Concrete Panels"],
    lighting: "Warm 2700K pendants + natural light emphasis",
    tip: "Keep negative space intentional. Less is luxury in contemporary design.",
  },
  "Indian Premium": {
    palette: ["#6B2D2D", "#D4AF37", "#FAEBD7", "#2E4057", "#C9A45C"],
    materials: ["Sheesham Wood", "Marble Inlay", "Brass Jali", "Rajasthani Tiles", "Silk Drapes"],
    lighting: "Warm 2700K + decorative brass pendants + diyas-inspired accents",
    tip: "Blend traditional Indian motifs with modern functionality. Pooja room should feel premium.",
  },
  "Rental Friendly": {
    palette: ["#F5F5F5", "#FFFFFF", "#E0E0E0", "#B0BEC5", "#78909C"],
    materials: ["Peel-stick Wallpaper", "Removable Hooks", "Modular Shelves", "Curtain Dividers", "Vinyl Flooring"],
    lighting: "Plug-in pendant 3500K + LED strip (no wiring needed)",
    tip: "Nothing permanent. Everything should be removable when you move out. Focus on soft furnishings.",
  },
  "Budget Makeover": {
    palette: ["#FFFFFF", "#F0EDE8", "#C9A45C", "#4A4A4A", "#E8E0D5"],
    materials: ["Laminate Finish", "PVC Wall Panels", "Ceramic Tiles", "Particle Board Furniture", "Acrylic Paint"],
    lighting: "LED panel 4000K + basic cove strip",
    tip: "Paint is the cheapest transformation. Fresh coat + one accent wall = 80% of the impact at 20% cost.",
  },
};

// ── Construction Progress Stages ────────────────────────────────────────────
const PROGRESS_STAGES = [
  "Excavation", "Foundation", "Plinth", "Column", "Beam", "Slab",
  "Brickwork", "Plaster", "Plumbing", "Electrical", "Flooring",
  "Painting", "Finishing", "Handover",
];

const PROGRESS_RISKS = ["On Track", "Minor Delay", "Needs Attention", "High Risk"] as const;

// ── Renovation Ideas — with priority levels per spec ───────────────────────
const RENOVATION_IDEAS: Record<string, { title: string; ideas: string[]; cost: string; priority: string }[]> = {
  Kitchen: [
    { title: "Modular Cabinet Upgrade", ideas: ["Marine ply + PU finish", "Soft-close hinges", "Built-in spice rack", "Tall pantry unit"], cost: "₹85,000 – ₹2,40,000", priority: "Must Do" },
    { title: "Counter & Backsplash", ideas: ["Granite / Quartz top", "Subway tile backsplash", "Undermount sink", "RO point built-in"], cost: "₹35,000 – ₹90,000", priority: "Must Do" },
    { title: "Lighting Revamp", ideas: ["Under-cabinet LEDs", "Island pendant (3500K)", "Motion-sensor task light"], cost: "₹12,000 – ₹30,000", priority: "Should Do" },
  ],
  Living: [
    { title: "Feature Wall", ideas: ["Fluted wood panel", "Stone cladding", "Wallpaper accent", "Built-in TV unit"], cost: "₹25,000 – ₹1,20,000", priority: "Should Do" },
    { title: "Flooring Upgrade", ideas: ["Engineered wood", "Large-format vitrified", "Anti-skid matte finish"], cost: "₹45,000 – ₹1,80,000", priority: "Optional" },
    { title: "False Ceiling + Lighting", ideas: ["Gypsum cove ceiling", "Recessed LED grid", "Warm RGB perimeter strip"], cost: "₹30,000 – ₹95,000", priority: "Optional" },
  ],
  Bedroom: [
    { title: "Wardrobe System", ideas: ["Full-height sliding wardrobe", "Mirror shutter", "Internal fittings (drawers, tie rack)", "Fabric-lined compartments"], cost: "₹55,000 – ₹2,20,000", priority: "Must Do" },
    { title: "Headboard & Paneling", ideas: ["Upholstered padded headboard", "Fluted plywood paneling", "Wall-mounted bedside shelves"], cost: "₹18,000 – ₹65,000", priority: "Should Do" },
    { title: "Acoustic Comfort", ideas: ["Carpet or rug underlay", "Heavy blackout drapes", "Acoustic panel behind TV"], cost: "₹8,000 – ₹35,000", priority: "Luxury Upgrade" },
  ],
  Bathroom: [
    { title: "Fixture Replacement", ideas: ["Concealed cistern + wall-hung WC", "Rain shower + hand shower", "Tempered glass partition"], cost: "₹40,000 – ₹1,50,000", priority: "Must Do" },
    { title: "Storage Solutions", ideas: ["Vanity with under-sink cabinet", "Recessed niche in shower wall", "Towel warming rail"], cost: "₹15,000 – ₹55,000", priority: "Should Do" },
    { title: "Tiling & Lighting", ideas: ["Large-format 600×1200mm tiles", "LED mirror with anti-fog", "Recessed waterproof downlights"], cost: "₹20,000 – ₹80,000", priority: "Should Do" },
  ],
  Exterior: [
    { title: "Waterproofing", ideas: ["Terrace waterproofing (Dr. Fixit / Pidilite)", "External wall damp treatment", "Drainage channel repair"], cost: "₹15,000 – ₹60,000", priority: "Must Do" },
    { title: "Facade Refresh", ideas: ["Exterior texture paint", "Stone cladding on entrance", "Gate and boundary wall repair"], cost: "₹40,000 – ₹2,00,000", priority: "Should Do" },
    { title: "Landscaping", ideas: ["Paver block driveway", "Small garden + planters", "Outdoor LED lighting"], cost: "₹20,000 – ₹80,000", priority: "Luxury Upgrade" },
  ],
};

// ── Quality Levels — Basic added per spec ──────────────────────────────────
const QUALITY_LEVELS = [
  { name: "Basic", key: "basic" as const, desc: "Budget practical construction" },
  { name: "Standard", key: "standard" as const, desc: "Balanced family home construction" },
  { name: "Premium", key: "premium" as const, desc: "Better finishing and materials" },
  { name: "Luxury", key: "luxury" as const, desc: "High-end villa or premium construction" },
];

// ── Disclaimer component ──────────────────────────────────────────────────
function EstimateDisclaimer() {
  return (
    <div className="mt-4 flex items-start gap-2 rounded-xl border border-skov-gold/20 bg-skov-gold/5 px-4 py-3 text-xs text-skov-cream/60">
      <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-skov-gold" />
      <span>This is an approximate planning estimate. Final pricing depends on live supplier quotes, site condition, design, brand, labour availability, and contractor scope.</span>
    </div>
  );
}

function BotCTA({ label, icon: Icon }: { label: string; icon?: typeof ArrowRight }) {
  return (
    <div className="mt-5 rounded-xl bg-skov-gold/10 border border-skov-gold/25 px-4 py-3 text-center">
      <span className="text-sm text-skov-gold font-medium flex items-center justify-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </span>
    </div>
  );
}

// ── Small reusable components ──────────────────────────────────────────────
function CoinBadge({ amount, sign = "+" }: { amount: number; sign?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-skov-gold/20 px-2 py-0.5 text-xs font-bold text-skov-gold">
      <Coins className="h-3 w-3" />{sign}{amount}
    </span>
  );
}

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.9 }}
      className="fixed bottom-28 right-6 z-[60] flex items-center gap-3 rounded-2xl border border-skov-gold/40 bg-skov-black/95 px-5 py-3 shadow-gold backdrop-blur-xl"
    >
      <Sparkles className="h-4 w-4 text-skov-gold" />
      <span className="text-sm text-skov-cream">{msg}</span>
      <button onClick={onClose} className="ml-2 text-skov-cream/50 hover:text-skov-gold"><X className="h-3 w-3" /></button>
    </motion.div>
  );
}

function UploadZone({ onUpload, label }: { onUpload: (name: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const handle = (name: string) => { setFile(name); onUpload(name); };
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f.name); }}
      onClick={() => ref.current?.click()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
        dragging ? "border-skov-gold bg-skov-gold/10" : "border-skov-gold/30 hover:border-skov-gold/60 hover:bg-white/[0.02]"
      }`}
    >
      <input ref={ref} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f.name); }} />
      {file ? (
        <div className="flex flex-col items-center gap-2">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
          <span className="text-sm text-skov-cream/80">{file}</span>
          <span className="text-xs text-skov-gold">Uploaded ✓</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload className="h-8 w-8 text-skov-gold/60" />
          <p className="text-sm text-skov-cream/70">{label}</p>
          <p className="text-xs text-skov-cream/40">Drag & drop or click to browse</p>
        </div>
      )}
    </div>
  );
}

// ── Bot Panels ────────────────────────────────────────────────────────────

function Sketch3DBot() {
  const [stage, setStage] = useState<"upload" | "scanning" | "done">("upload");
  const [style, setStyle] = useState("Modern");
  const [view, setView] = useState<"plan" | "elevation" | "3d">("plan");
  const styles = ["Modern", "Traditional", "Vastu Classic", "Contemporary"];
  const rooms = [
    { label: "Living Room", w: 180, h: 140, x: 10, y: 10, color: "rgba(201,164,92,0.12)" },
    { label: "Master Bed", w: 140, h: 130, x: 200, y: 10, color: "rgba(147,112,219,0.12)" },
    { label: "Bed 2", w: 130, h: 120, x: 350, y: 10, color: "rgba(100,149,237,0.12)" },
    { label: "Kitchen", w: 120, h: 100, x: 10, y: 160, color: "rgba(60,179,113,0.12)" },
    { label: "Dining", w: 150, h: 100, x: 140, y: 160, color: "rgba(255,165,0,0.12)" },
    { label: "Toilet 1", w: 80, h: 70, x: 300, y: 160, color: "rgba(255,105,180,0.12)" },
    { label: "Toilet 2", w: 80, h: 70, x: 390, y: 160, color: "rgba(255,105,180,0.12)" },
    { label: "Balcony", w: 480, h: 60, x: 10, y: 270, color: "rgba(201,164,92,0.07)" },
  ];
  const handleUpload = () => {
    setStage("scanning");
    setTimeout(() => setStage("done"), 2800);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/15 text-purple-400"><Camera className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Sketch → 3D Home Bot</h2>
          <p className="text-sm text-skov-cream/60">Upload your rough sketch, floor plan, or blueprint. I will analyze the layout and suggest a practical 3D home concept.</p>
        </div>
      </div>
      {stage === "upload" && (
        <div className="space-y-4">
          <UploadZone onUpload={() => {}} label="Drop your sketch, blueprint, or phone photo here" />
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-skov-cream/50">Style:</span>
            {styles.map((s) => (
              <button key={s} onClick={() => setStyle(s)} className={`rounded-full border px-3 py-1 text-xs transition ${style === s ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 text-skov-cream/60 hover:border-skov-gold/50"}`}>{s}</button>
            ))}
          </div>
          <button onClick={handleUpload} className="btn-gold w-full">Analyze & Generate Concept <Sparkles className="h-4 w-4" /></button>
        </div>
      )}
      {stage === "scanning" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-dark p-8 text-center space-y-4">
          <div className="relative mx-auto h-16 w-16">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-skov-gold/30 border-t-skov-gold" />
            <div className="absolute inset-2 flex items-center justify-center"><Camera className="h-6 w-6 text-skov-gold" /></div>
          </div>
          <p className="text-skov-gold font-medium">Analysing your sketch...</p>
          <div className="space-y-2 text-sm text-skov-cream/60">
            {["Detecting walls & openings", "Identifying room zones", "Checking circulation & ventilation", "Generating floor plan concept"].map((s, i) => (
              <motion.p key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.6 }}
                className="flex items-center justify-center gap-2">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}>⬡</motion.span> {s}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
      {stage === "done" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["plan", "elevation", "3d"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${view === v ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 text-skov-cream/60 hover:border-skov-gold/40"}`}>{v === "3d" ? "3D View" : v === "plan" ? "Floor Plan" : "Elevation"}</button>
            ))}
            <button onClick={() => setStage("upload")} className="ml-auto flex items-center gap-1 rounded-full border border-skov-gold/20 px-3 py-1.5 text-xs text-skov-cream/60 hover:border-skov-gold/40"><RotateCcw className="h-3 w-3" /> New Upload</button>
          </div>
          <div className="card-dark overflow-hidden p-4">
            <p className="mb-3 text-xs text-skov-gold">✦ {style} Style — CONCEPT ONLY — AI-Generated {view === "plan" ? "Floor Plan" : view === "elevation" ? "Elevation" : "3D View"}</p>
            {view === "plan" && (
              <svg viewBox="0 0 490 340" className="w-full rounded-xl bg-skov-black/60" style={{ maxHeight: 300 }}>
                <rect width="490" height="340" fill="#0B0B0B" />
                <rect x="8" y="8" width="474" height="324" fill="none" stroke="rgba(201,164,92,0.7)" strokeWidth="3" />
                {rooms.map((r) => (
                  <g key={r.label}>
                    <rect x={r.x + 12} y={r.y + 12} width={r.w} height={r.h} fill={r.color} stroke="rgba(201,164,92,0.5)" strokeWidth="1.5" rx="2" />
                    <text x={r.x + 12 + r.w / 2} y={r.y + 12 + r.h / 2} textAnchor="middle" dominantBaseline="middle" fill="rgba(248,243,234,0.75)" fontSize="9" fontFamily="Inter, sans-serif">{r.label}</text>
                  </g>
                ))}
                <path d="M 22 150 Q 52 150 52 120" fill="none" stroke="rgba(201,164,92,0.6)" strokeWidth="1" />
                <path d="M 200 150 Q 200 120 230 120" fill="none" stroke="rgba(201,164,92,0.6)" strokeWidth="1" />
                <text x="460" y="18" fill="rgba(201,164,92,0.8)" fontSize="10" fontFamily="Inter" textAnchor="middle">N↑</text>
              </svg>
            )}
            {view === "elevation" && (
              <svg viewBox="0 0 490 200" className="w-full rounded-xl bg-skov-black/60" style={{ maxHeight: 200 }}>
                <rect width="490" height="200" fill="#0B0B0B" />
                <rect x="0" y="180" width="490" height="20" fill="rgba(201,164,92,0.1)" />
                <rect x="40" y="40" width="410" height="140" fill="rgba(201,164,92,0.06)" stroke="rgba(201,164,92,0.5)" strokeWidth="2" />
                {[80, 180, 280, 360].map((x) => (
                  <rect key={x} x={x} y="70" width="55" height="45" fill="rgba(100,149,237,0.2)" stroke="rgba(201,164,92,0.6)" strokeWidth="1.5" rx="2" />
                ))}
                <rect x="205" y="130" width="80" height="50" fill="rgba(201,164,92,0.15)" stroke="rgba(201,164,92,0.6)" strokeWidth="2" rx="3" />
                <polygon points="20,40 245,5 470,40" fill="none" stroke="rgba(201,164,92,0.5)" strokeWidth="2" />
                <text x="245" y="195" textAnchor="middle" fill="rgba(248,243,234,0.4)" fontSize="9" fontFamily="Inter">{style} Elevation — CONCEPT ONLY</text>
              </svg>
            )}
            {view === "3d" && (
              <svg viewBox="0 0 490 280" className="w-full rounded-xl bg-skov-black/60" style={{ maxHeight: 280 }}>
                <rect width="490" height="280" fill="#0B0B0B" />
                <polygon points="80,240 80,100 280,100 280,240" fill="rgba(201,164,92,0.08)" stroke="rgba(201,164,92,0.6)" strokeWidth="2" />
                <polygon points="280,100 280,240 420,180 420,40" fill="rgba(201,164,92,0.05)" stroke="rgba(201,164,92,0.5)" strokeWidth="1.5" />
                <polygon points="80,100 280,100 420,40 220,40" fill="rgba(201,164,92,0.12)" stroke="rgba(201,164,92,0.7)" strokeWidth="2" />
                <polygon points="80,100 280,100 350,50 155,50" fill="rgba(201,164,92,0.18)" stroke="rgba(201,164,92,0.8)" strokeWidth="1.5" />
                <rect x="100" y="130" width="60" height="50" fill="rgba(100,149,237,0.25)" stroke="rgba(201,164,92,0.6)" strokeWidth="1" rx="2" />
                <rect x="190" y="130" width="60" height="50" fill="rgba(100,149,237,0.25)" stroke="rgba(201,164,92,0.6)" strokeWidth="1" rx="2" />
                <rect x="145" y="180" width="50" height="60" fill="rgba(201,164,92,0.2)" stroke="rgba(201,164,92,0.6)" strokeWidth="1.5" />
                <rect x="300" y="100" width="70" height="50" fill="rgba(100,149,237,0.2)" stroke="rgba(201,164,92,0.5)" strokeWidth="1" rx="2" />
                <ellipse cx="250" cy="250" rx="210" ry="18" fill="rgba(201,164,92,0.06)" />
                <text x="245" y="270" textAnchor="middle" fill="rgba(248,243,234,0.4)" fontSize="9" fontFamily="Inter">{style} — CONCEPT ONLY — AI Draft</text>
              </svg>
            )}
          </div>
          {/* Analysis table */}
          <div className="card-dark p-4 space-y-2">
            <p className="text-sm font-medium text-skov-gold">Layout Analysis</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-skov-gold/15"><th className="text-left py-1.5 text-skov-cream/60">Area</th><th className="text-left py-1.5 text-skov-cream/60">Observation</th><th className="text-left py-1.5 text-skov-cream/60">Improvement</th></tr></thead>
                <tbody>
                  {[["Entry", "East-facing main door", "Good for Vastu — ensure 3ft min width"],
                    ["Living", "Connected to dining — open plan", "Consider partition for privacy"],
                    ["Kitchen", "South-East placement", "Vastu compliant ✅ — add chimney duct"],
                    ["Ventilation", "Cross-ventilation partial", "Add window opposite to kitchen exhaust"],
                    ["Circulation", "Clear hallway flow", "Ensure 3ft corridor width minimum"]].map(([a, o, imp]) => (
                    <tr key={a} className="border-b border-skov-gold/10"><td className="py-2 text-skov-cream/70">{a}</td><td className="py-2 text-skov-cream/60">{o}</td><td className="py-2 text-skov-gold/80">{imp}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="card-dark p-3"><div className="text-xs text-skov-cream/50">Est. Carpet Area</div><div className="font-semibold text-skov-gold mt-1">~1,350 sqft (ESTIMATE)</div></div>
            <div className="card-dark p-3"><div className="text-xs text-skov-cream/50">Total Rooms</div><div className="font-semibold text-skov-gold mt-1">3 BHK + 2 Baths</div></div>
            <div className="card-dark p-3"><div className="text-xs text-skov-cream/50">Vastu Compliance</div><div className="font-semibold text-green-400 mt-1">~92% ✓ (APPROXIMATE)</div></div>
          </div>
          <div className="text-xs text-skov-cream/40 flex items-start gap-1.5">
            <AlertCircle className="h-3 w-3 flex-shrink-0 mt-0.5 text-skov-gold/60" />
            <span>This is a concept direction only, not a final architectural or structural drawing. Structural safety cannot be certified from image analysis alone. Consult a qualified engineer for final drawings.</span>
          </div>
          <BotCTA label="Upload your sketch" icon={Upload} />
        </motion.div>
      )}
    </div>
  );
}

function CostBot({ onEarnCoins }: { onEarnCoins: (label: string, amt: number) => void }) {
  const [city, setCity] = useState("Raipur");
  const [area, setArea] = useState(1500);
  const [floors, setFloors] = useState(1);
  const [quality, setQuality] = useState<"basic" | "standard" | "premium" | "luxury">("standard");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PriceFetchResult | null>(null);
  const [customCity, setCustomCity] = useState("");

  const doFetch = async () => {
    setLoading(true);
    setResult(null);
    const r = await fetchLivePrices(customCity || city);
    setResult(r);
    setLoading(false);
    onEarnCoins("Cost Estimate Generated", 5);
  };

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
  // Map basic to standard range with lower multiplier
  const qualityKey = quality === "basic" ? "standard" : quality;
  const range = result?.buildCostRange[qualityKey];
  const basicDiscount = quality === "basic" ? 0.78 : 1;
  const total = range ? [Math.round(range[0] * area * floors * 0.9 * basicDiscount), Math.round(range[1] * area * floors * basicDiscount)] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-500/15 text-green-400"><Calculator className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Construction Cost Bot</h2>
          <p className="text-sm text-skov-cream/60">Share your city, built-up area, floors, and quality level. I will prepare an approximate construction cost estimate.</p>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-dark space-y-5 p-5">
          <div>
            <label className="label-gold">City (Chhattisgarh priority)</label>
            <div className="flex flex-wrap gap-2">
              {PRIORITY_CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCity(c); setCustomCity(""); }}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    city === c && !customCity
                      ? "border-skov-gold bg-skov-gold/15 text-skov-gold font-medium"
                      : "border-skov-gold/20 bg-skov-black/40 text-skov-cream/60 hover:border-skov-gold/40 hover:text-skov-cream"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {OTHER_CITIES.slice(0, 5).map((c) => (
                <button
                  key={c}
                  onClick={() => { setCity(c); setCustomCity(""); }}
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] transition ${
                    city === c && !customCity
                      ? "border-skov-gold bg-skov-gold/15 text-skov-gold font-medium"
                      : "border-skov-gold/15 bg-skov-black/20 text-skov-cream/40 hover:border-skov-gold/30 hover:text-skov-cream"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <input className="input-dark mt-2 !py-2 text-sm bg-black/60" placeholder="Or type any Indian city…" value={customCity} onChange={(e) => setCustomCity(e.target.value)} />
          </div>
          <div>
            <label className="label-gold">Built-up Area: <span className="text-skov-gold">{area.toLocaleString("en-IN")} sqft</span></label>
            <input type="range" min={400} max={8000} step={50} value={area} onChange={(e) => setArea(+e.target.value)} className="w-full accent-skov-gold" />
          </div>
          <div>
            <label className="label-gold">Floors</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((f) => (
                <button
                  key={f}
                  onClick={() => setFloors(f)}
                  className={`flex-1 rounded-xl border py-2 text-sm transition ${
                    floors === f
                      ? "border-skov-gold bg-skov-gold/15 text-skov-gold font-medium"
                      : "border-skov-gold/20 bg-skov-black/40 text-skov-cream/60 hover:border-skov-gold/40 hover:text-skov-cream"
                  }`}
                >
                  G+{f - 1}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-gold">Quality Level</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {QUALITY_LEVELS.map((q) => (
                <button
                  key={q.key}
                  onClick={() => setQuality(q.key)}
                  className={`rounded-xl border p-3 text-left transition ${
                    quality === q.key
                      ? "border-skov-gold bg-skov-gold/10 text-skov-gold font-medium"
                      : "border-skov-gold/20 bg-skov-black/40 text-skov-cream/60 hover:border-skov-gold/40 hover:text-skov-cream"
                  }`}
                >
                  <div className="font-medium text-sm">{q.name}</div>
                  <div className={`mt-1 text-xs transition ${
                    quality === q.key ? "text-skov-gold/80" : "text-skov-cream/40"
                  }`}>{q.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={doFetch} disabled={loading} className="btn-gold w-full disabled:opacity-60">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Fetching live rates…</> : <><Zap className="h-4 w-4" /> Get Approximate Estimate</>}
          </button>
        </div>
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card-dark flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="relative h-14 w-14">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-skov-gold/30 border-t-skov-gold" />
                <IndianRupee className="absolute inset-0 m-auto h-5 w-5 text-skov-gold" />
              </div>
              <div className="space-y-1 text-sm text-skov-cream/70">
                {["Checking cement rates…", "Checking steel prices…", "Calculating labour costs…", "Preparing estimate…"].map((s, i) => (
                  <motion.p key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}>{s}</motion.p>
                ))}
              </div>
            </motion.div>
          )}
          {result && !loading && (
            <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-dark relative overflow-hidden p-6 space-y-4">
              <div className="absolute inset-0 bg-gold-radial opacity-70 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-yellow-500/15 border border-yellow-500/30 px-2 py-0.5 text-[10px] text-yellow-400 font-medium">APPROXIMATE ESTIMATE</span>
                  <span className="text-xs text-skov-cream/40">{result.timestamp}</span>
                </div>
                <div className="mt-3">
                  <div className="text-xs text-skov-cream/50 mb-1">Estimated Range</div>
                  <div className="font-display text-3xl gold-text">{total ? fmt(total[0]) : "—"} – {total ? fmt(total[1]) : "—"}</div>
                </div>
                {/* Cost breakdown table */}
                <div className="mt-5 space-y-2 text-sm">
                  <div className="font-medium text-skov-cream/80">Cost Breakdown (Approximate)</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-skov-gold/15"><th className="text-left py-1.5 text-skov-cream/60">Cost Head</th><th className="text-right py-1.5 text-skov-cream/60">Low</th><th className="text-right py-1.5 text-skov-cream/60">Expected</th><th className="text-right py-1.5 text-skov-cream/60">High</th></tr></thead>
                      <tbody>
                        {total && [
                          { label: "Civil & Structure (45%)", pct: 0.45 },
                          { label: "Finishes & Interiors (28%)", pct: 0.28 },
                          { label: "Plumbing & Electrical (15%)", pct: 0.15 },
                          { label: "Design & Supervision (7%)", pct: 0.07 },
                          { label: "Approvals & Contingency (5%)", pct: 0.05 },
                        ].map((row) => (
                          <tr key={row.label} className="border-b border-skov-gold/10">
                            <td className="py-2 text-skov-cream/70">{row.label}</td>
                            <td className="text-right py-2 text-skov-cream/60">{fmt(Math.round(total[0] * row.pct))}</td>
                            <td className="text-right py-2 text-skov-gold">{fmt(Math.round(((total[0] + total[1]) / 2) * row.pct))}</td>
                            <td className="text-right py-2 text-skov-cream/60">{fmt(Math.round(total[1] * row.pct))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Key material rates */}
                <div className="mt-4 space-y-1.5 text-sm">
                  <div className="font-medium text-skov-cream/80">Key Material Rates — {result.city}</div>
                  {[
                    ["Cement (50kg bag)", `₹${result.rates.cement_bag_50kg}`],
                    ["Steel TMT (per tonne)", `₹${result.rates.steel_tmt_ton.toLocaleString("en-IN")}`],
                    ["Red Bricks (per 1000)", `₹${result.rates.bricks_1000.toLocaleString("en-IN")}`],
                    ["Labour (mason/day)", `₹${result.laborRate.min}–₹${result.laborRate.max}`],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between border-b border-skov-gold/10 pb-1 text-xs">
                      <span className="text-skov-cream/65">{l}</span>
                      <span className="text-skov-gold font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white/5 p-3">
                  <div className="text-xs text-skov-cream/50 mb-1">Estimated Timeline ({QUALITY_LEVELS.find(q => q.key === quality)?.name})</div>
                  <div className="font-semibold text-skov-cream">{quality === "basic" ? "10–14 months" : result.timeline[qualityKey]}</div>
                </div>
                <EstimateDisclaimer />
                <BotCTA label="Share your city and area for a live estimate" icon={MapPin} />
              </div>
            </motion.div>
          )}
          {!result && !loading && (
            <div className="card-dark flex flex-col items-center justify-center gap-4 p-8 text-center">
              <IndianRupee className="h-10 w-10 text-skov-gold/50" />
              <p className="text-sm text-skov-cream/70">Fill the form and click to get an approximate estimated cost</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ContractorBot() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState("");
  const [projType, setProjType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [done, setDone] = useState(false);

  const projTypes = ["New Home Build", "Renovation", "Commercial", "Interior Fit-out", "Extension / Addition"];
  const budgets = ["Under ₹20L", "₹20L–₹50L", "₹50L–₹1Cr", "₹1Cr+"];
  const timelines = ["Within 1 month", "1–3 months", "3–6 months", "6+ months"];

  const search = () => { setDone(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-400"><Users className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Contractor Match Bot</h2>
          <p className="text-sm text-skov-cream/60">Tell me your city, project type, budget, and timeline. I will help you compare suitable contractor options.</p>
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <label className="label-gold"><MapPin className="inline h-3 w-3 text-skov-gold mr-1" />Your Project City</label>
          <div className="flex flex-wrap gap-2">
            {PRIORITY_CITIES.map((c) => (
              <button key={c} onClick={() => { setCity(c); setStep(1); }} className={`rounded-full border px-3 py-1.5 text-xs transition ${city === c ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{c}</button>
            ))}
          </div>
          <input className="input-dark" placeholder="Or type any city…" value={city} onChange={(e) => setCity(e.target.value)} />
          {city && <button onClick={() => setStep(1)} className="btn-gold">Next <ChevronRight className="h-4 w-4" /></button>}
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <label className="label-gold">Project Type</label>
          <div className="flex flex-wrap gap-2">
            {projTypes.map((s) => (
              <button key={s} onClick={() => { setProjType(s); setStep(2); }} className="rounded-full border border-skov-gold/30 px-4 py-2 text-sm text-skov-cream hover:border-skov-gold hover:bg-skov-gold/10 transition">{s}</button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <label className="label-gold">Budget Range</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {budgets.map((b) => (
              <button key={b} onClick={() => { setBudget(b); setStep(3); }} className="rounded-xl border border-skov-gold/20 p-3 text-left text-sm hover:border-skov-gold/40 transition">{b}</button>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <label className="label-gold">When do you plan to start?</label>
          <div className="flex flex-wrap gap-2">
            {timelines.map((t) => (
              <button key={t} onClick={() => { setTimeline(t); search(); }} className="rounded-full border border-skov-gold/30 px-4 py-2 text-sm text-skov-cream hover:border-skov-gold hover:bg-skov-gold/10 transition">{t}</button>
            ))}
          </div>
        </div>
      )}
      {done && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-skov-cream/70">Contractor guidance for {city} • {projType} • {budget}</p>
            <button onClick={() => { setStep(0); setDone(false); setCity(""); setProjType(""); setBudget(""); setTimeline(""); }} className="text-xs text-skov-gold hover:underline">Start Over</button>
          </div>

          {/* Contractor type comparison table */}
          <div className="card-dark p-5 space-y-3">
            <p className="text-sm font-medium text-skov-gold">Contractor Type Comparison</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-skov-gold/15">
                    <th className="text-left py-2 text-skov-cream/60">Contractor Type</th>
                    <th className="text-left py-2 text-skov-cream/60">Best For</th>
                    <th className="text-left py-2 text-skov-cream/60">What to Check</th>
                    <th className="text-left py-2 text-skov-cream/60">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTRACTOR_TYPES.map((c) => (
                    <tr key={c.type} className="border-b border-skov-gold/10 hover:bg-white/[0.02]">
                      <td className="py-2.5 text-skov-cream/80 font-medium">{c.type}</td>
                      <td className="py-2.5 text-skov-cream/60">{c.bestFor}</td>
                      <td className="py-2.5 text-skov-cream/60">{c.check}</td>
                      <td className="py-2.5"><span className={`rounded-full px-2 py-0.5 ${c.risk === "Low" ? "bg-green-500/15 text-green-400" : c.risk === "Low-Medium" ? "bg-blue-500/15 text-blue-400" : "bg-yellow-500/15 text-yellow-400"}`}>{c.risk}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trust checks checklist */}
          <div className="card-dark p-5 space-y-3">
            <p className="text-sm font-medium text-skov-gold">Before Hiring — Trust Checklist</p>
            {["Ask for previous work photos", "Visit one of their completed sites", "Get written quotation with brand list", "Agree on payment schedule before work starts", "Get timeline commitment in writing", "Ask about labour availability in your area", "Request client references (minimum 2)", "Sign agreement before any payment"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-skov-cream/70"><CheckCircle2 className="h-3.5 w-3.5 text-skov-gold flex-shrink-0" />{item}</div>
            ))}
          </div>

          {/* Contractor verification statuses */}
          <div className="card-dark p-5 space-y-3">
            <p className="text-sm font-medium text-skov-gold">SKOV Contractor Verification Levels</p>
            {CONTRACTOR_STATUSES.map((s) => (
              <div key={s.status} className="flex items-center justify-between text-xs border-b border-skov-gold/10 pb-2">
                <span className={`font-medium ${s.color}`}>{s.status}</span>
                <span className="text-skov-cream/50 text-right max-w-[55%]">{s.meaning}</span>
              </div>
            ))}
            <p className="text-[10px] text-skov-cream/40 mt-2">Not every contractor is verified. SKOV Verified badge is awarded only after review.</p>
          </div>

          <BotCTA label="Compare contractors in your city" icon={Users} />
        </motion.div>
      )}
    </div>
  );
}

function RenovationBot() {
  const [room, setRoom] = useState<keyof typeof RENOVATION_IDEAS | "">("");
  const [uploaded, setUploaded] = useState(false);
  const [cityInput, setCityInput] = useState("Raipur");
  const rooms = Object.keys(RENOVATION_IDEAS) as (keyof typeof RENOVATION_IDEAS)[];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500/15 text-orange-400"><Wrench className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Renovation Advisor</h2>
          <p className="text-sm text-skov-cream/60">Share your property photo, city, area, and renovation goal. I will suggest a practical renovation plan.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-gold">Your City</label>
          <input className="input-dark" value={cityInput} onChange={(e) => setCityInput(e.target.value)} placeholder="e.g. Raipur" />
        </div>
        <div>
          <label className="label-gold">Upload Room / Property Photo</label>
          <UploadZone onUpload={() => setUploaded(true)} label="Upload room photo or house layout" />
        </div>
      </div>
      {uploaded && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <label className="label-gold">Select Area to Renovate</label>
          <div className="flex flex-wrap gap-2">
            {rooms.map((r) => (
              <button key={r} onClick={() => setRoom(r)} className={`rounded-full border px-4 py-2 text-sm transition ${room === r ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{r}</button>
            ))}
          </div>
        </motion.div>
      )}
      {room && RENOVATION_IDEAS[room] && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="card-dark p-4 overflow-x-auto">
            <p className="text-sm font-medium text-skov-gold mb-3">{room} Renovation Plan — {cityInput}</p>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-skov-gold/15"><th className="text-left py-1.5 text-skov-cream/60">Renovation Area</th><th className="text-left py-1.5 text-skov-cream/60">Suggested Work</th><th className="text-left py-1.5 text-skov-cream/60">Budget Priority</th><th className="text-right py-1.5 text-skov-cream/60">Approx. Cost</th></tr></thead>
              <tbody>
                {RENOVATION_IDEAS[room].map((section) => (
                  <tr key={section.title} className="border-b border-skov-gold/10">
                    <td className="py-2.5 text-skov-cream/80 font-medium align-top">{section.title}</td>
                    <td className="py-2.5 text-skov-cream/60">{section.ideas.join(", ")}</td>
                    <td className="py-2.5"><span className={`rounded-full px-2 py-0.5 text-[10px] border ${
                      section.priority === "Must Do" ? "border-red-400/40 text-red-400" :
                      section.priority === "Should Do" ? "border-yellow-400/40 text-yellow-400" :
                      section.priority === "Optional" ? "border-green-400/40 text-green-400" :
                      "border-purple-400/40 text-purple-400"
                    }`}>{section.priority}</span></td>
                    <td className="py-2.5 text-right text-skov-gold">{section.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-skov-cream/40 flex items-start gap-1.5">
            <AlertCircle className="h-3 w-3 flex-shrink-0 mt-0.5 text-skov-gold/60" />
            <span>Never break structural walls without engineer approval. Final budget depends on brand, labour, and site condition.</span>
          </div>
          <EstimateDisclaimer />
          <BotCTA label="Share your site photo" icon={Camera} />
        </motion.div>
      )}
    </div>
  );
}

function LeadBot({ onEarnCoins }: { onEarnCoins: (label: string, amt: number) => void }) {
  const steps = [
    { q: "I can help you get the right guidance. What city is your project in?", key: "city", type: "text", placeholder: "e.g. Raipur, Bilaspur, Bhilai…" },
    { q: "What type of construction are you planning?", key: "type", type: "choice", choices: ["New Home Build", "Renovation", "Commercial", "Extension / Addition"] },
    { q: "What is your approximate area (sqft)?", key: "area", type: "text", placeholder: "e.g. 1200 sqft" },
    { q: "When do you plan to start?", key: "timeline", type: "choice", choices: ["Within 1 month", "1–3 months", "3–6 months", "6+ months"] },
    { q: "What is your target budget?", key: "budget", type: "choice", choices: ["Under ₹20 Lakhs", "₹20L – ₹50L", "₹50L – ₹1Cr", "Above ₹1 Crore"] },
    { q: "Your name & WhatsApp number so our expert can reach you?", key: "contact", type: "text", placeholder: "Name — +91 XXXXX XXXXX" },
  ];
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "I can help you get the right guidance. Please share your city and project type first." }]);
  const [inputVal, setInputVal] = useState("");
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const addMsg = (role: "user" | "bot", text: string) => {
    setMsgs((m) => [...m, { role, text, ts: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }]);
  };
  const submitAnswer = (val: string) => {
    if (!val.trim()) return;
    const step = steps[idx];
    setAnswers((a) => ({ ...a, [step.key]: val }));
    addMsg("user", val);
    setInputVal("");
    const next = idx + 1;
    if (next < steps.length) {
      setTimeout(() => { addMsg("bot", steps[next].q); setIdx(next); }, 600);
    } else {
      setTimeout(() => {
        addMsg("bot", "✅ Your project requirement has been submitted. Our SKOV expert will reach you on WhatsApp within 2 hours. You have earned 50 SKOV Coins! 🎉\n\nNo pressure, no obligation — just honest guidance.");
        setDone(true);
        onEarnCoins("Lead Qualification Completed", 50);
      }, 600);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-skov-gold/15 text-skov-gold"><MessageSquare className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Lead Qualification Bot</h2>
          <p className="text-sm text-skov-cream/60">Chat instead of filling a form • Complete to earn <CoinBadge amount={50} /></p>
        </div>
      </div>
      <div className="card-dark flex flex-col" style={{ height: 400 }}>
        <div className="flex-1 overflow-y-auto space-y-3 p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${m.role === "user" ? "bg-skov-gold text-skov-black" : "bg-white/5 border border-skov-gold/15 text-skov-cream"}`}>
                {m.text}
                {m.ts && <div className="mt-1 text-[9px] opacity-50">{m.ts}</div>}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        {!done && (
          <div className="border-t border-skov-gold/15 p-3">
            {steps[idx]?.type === "choice" ? (
              <div className="flex flex-wrap gap-2">
                {steps[idx].choices?.map((c) => (
                  <button key={c} onClick={() => submitAnswer(c)} className="rounded-full border border-skov-gold/30 px-3 py-1.5 text-xs text-skov-cream hover:border-skov-gold hover:bg-skov-gold/10 transition">{c}</button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                <input className="input-dark !py-2 text-sm" placeholder={steps[idx]?.placeholder || "Type here…"} value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitAnswer(inputVal)} />
                <button onClick={() => submitAnswer(inputVal)} className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-skov-gold text-skov-black"><Send className="h-4 w-4" /></button>
              </div>
            )}
          </div>
        )}
        {done && <BotCTA label="Book a consultation" icon={Phone} />}
      </div>
    </div>
  );
}

function PlanBot() {
  const [plotW, setPlotW] = useState(30);
  const [plotL, setPlotL] = useState(40);
  const [roadFacing, setRoadFacing] = useState("East");
  const [staircase, setStaircase] = useState<"Internal" | "External">("Internal");
  const [floors, setFloors] = useState(2);
  const [generated, setGenerated] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/15 text-cyan-400"><LayoutDashboard className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">House Plan Assistant</h2>
          <p className="text-sm text-skov-cream/60">Share your plot size, road-facing side, floors, and room requirements. I will suggest a practical house plan direction.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="label-gold">Plot Width (ft): {plotW}</label>
          <input type="range" min={15} max={80} value={plotW} onChange={(e) => setPlotW(+e.target.value)} className="w-full accent-skov-gold" />
        </div>
        <div>
          <label className="label-gold">Plot Length (ft): {plotL}</label>
          <input type="range" min={20} max={120} value={plotL} onChange={(e) => setPlotL(+e.target.value)} className="w-full accent-skov-gold" />
        </div>
        <div>
          <label className="label-gold">Floors</label>
          <div className="flex gap-2 mt-1">
            {[1, 2, 3].map((f) => (
              <button key={f} onClick={() => setFloors(f)} className={`flex-1 rounded-xl border py-2 text-sm transition ${floors === f ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>G+{f - 1}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="label-gold">Road-facing Side</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {["East", "West", "North", "South"].map((d) => (
              <button key={d} onClick={() => setRoadFacing(d)} className={`rounded-full border px-3 py-1.5 text-xs transition ${roadFacing === d ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="label-gold">Staircase</label>
          <div className="flex gap-2 mt-1">
            {(["Internal", "External"] as const).map((s) => (
              <button key={s} onClick={() => setStaircase(s)} className={`flex-1 rounded-xl border py-2 text-sm transition ${staircase === s ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => setGenerated(true)} className="btn-gold"><LayoutDashboard className="h-4 w-4" />Generate Plan Suggestion</button>
      {generated && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="card-dark p-4">
            <p className="text-xs text-skov-gold mb-3">✦ CONCEPT ONLY — {plotW}×{plotL} ft Plot — {roadFacing}-facing — {staircase} Staircase — G+{floors - 1}</p>
            <svg viewBox="0 0 300 300" className="w-full rounded-xl bg-skov-black/60" style={{ maxHeight: 260 }}>
              <rect width="300" height="300" fill="#0B0B0B" />
              <rect x="5" y="5" width="290" height="290" fill="none" stroke="rgba(201,164,92,0.7)" strokeWidth="2" />
              <rect x="8" y="8" width="130" height="110" fill="rgba(201,164,92,0.1)" stroke="rgba(201,164,92,0.5)" strokeWidth="1" />
              <text x="73" y="68" textAnchor="middle" fill="rgba(248,243,234,0.8)" fontSize="8">Living Room</text>
              <rect x="145" y="8" width="148" height="110" fill="rgba(147,112,219,0.1)" stroke="rgba(201,164,92,0.5)" strokeWidth="1" />
              <text x="219" y="68" textAnchor="middle" fill="rgba(248,243,234,0.8)" fontSize="8">Master Bedroom</text>
              <rect x="8" y="125" width="100" height="90" fill="rgba(60,179,113,0.1)" stroke="rgba(201,164,92,0.5)" strokeWidth="1" />
              <text x="58" y="175" textAnchor="middle" fill="rgba(248,243,234,0.8)" fontSize="8">Kitchen (SE)</text>
              <rect x="115" y="125" width="100" height="90" fill="rgba(255,165,0,0.1)" stroke="rgba(201,164,92,0.5)" strokeWidth="1" />
              <text x="165" y="175" textAnchor="middle" fill="rgba(248,243,234,0.8)" fontSize="8">Dining</text>
              <rect x="222" y="125" width="71" height="90" fill="rgba(100,149,237,0.1)" stroke="rgba(201,164,92,0.5)" strokeWidth="1" />
              <text x="257" y="165" textAnchor="middle" fill="rgba(248,243,234,0.8)" fontSize="7">{staircase === "Internal" ? "Staircase" : "Bed 2"}</text>
              <rect x="8" y="222" width="285" height="70" fill="rgba(201,164,92,0.06)" stroke="rgba(201,164,92,0.4)" strokeWidth="1" />
              <text x="150" y="262" textAnchor="middle" fill="rgba(248,243,234,0.6)" fontSize="8">Front Setback ({roadFacing}-facing)</text>
              <text x="290" y="20" textAnchor="end" fill="rgba(201,164,92,0.8)" fontSize="9">N↑</text>
            </svg>
          </div>
          {/* Room placement suggestion table */}
          <div className="card-dark p-4 space-y-2">
            <p className="text-sm font-medium text-skov-gold">Suggested Room Placement</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-skov-gold/15"><th className="text-left py-1.5 text-skov-cream/60">Space</th><th className="text-left py-1.5 text-skov-cream/60">Suggested Position</th><th className="text-left py-1.5 text-skov-cream/60">Reason</th></tr></thead>
                <tbody>
                  {VASTU_DATA.map((v) => (
                    <tr key={v.room} className="border-b border-skov-gold/10">
                      <td className="py-2 text-skov-cream/80">{v.room}</td>
                      <td className="py-2 text-skov-gold">{v.dir}</td>
                      <td className="py-2 text-skov-cream/50">{v.vastu ? "Vastu compliant ✅" : "Adjust if possible"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="card-dark p-4 space-y-3">
              <p className="text-sm font-medium text-skov-gold">Plot Summary</p>
              {[["Total Area", `${plotW * plotL} sqft`], ["Carpet Area (est.)", `${Math.round(plotW * plotL * 0.65)} sqft`], ["Built-up (G+${floors - 1})", `~${Math.round(plotW * plotL * 0.65 * floors)} sqft`], ["Road Side", `${roadFacing}-facing`]].map(([l, v]) => (
                <div key={l as string} className="flex justify-between text-xs">
                  <span className="text-skov-cream/70">{l}</span>
                  <span className="text-skov-gold">{v}</span>
                </div>
              ))}
            </div>
            <div className="card-dark p-4 space-y-2">
              <p className="text-sm font-medium text-skov-gold">Practical Notes</p>
              <ul className="space-y-1.5 text-xs text-skov-cream/60">
                <li>• Ensure 3ft min corridor width for circulation</li>
                <li>• Plan utility area near kitchen (washing, gas)</li>
                <li>• Keep parking near main gate for easy access</li>
                <li>• Consider future floor expansion in column layout</li>
              </ul>
            </div>
          </div>
          <div className="text-xs text-skov-cream/40 flex items-start gap-1.5">
            <AlertCircle className="h-3 w-3 flex-shrink-0 mt-0.5 text-skov-gold/60" />
            <span>This is a concept direction, not a final architectural or structural drawing. Consult a qualified architect for working drawings.</span>
          </div>
          <BotCTA label="Share your city and area for a live estimate" icon={MapPin} />
        </motion.div>
      )}
    </div>
  );
}

function MaterialBot() {
  const [city, setCity] = useState("Raipur");
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<PriceFetchResult | null>(null);

  const doFetch = async () => {
    setLoading(true);
    const r = await fetchLivePrices(city);
    setPrices(r);
    setLoading(false);
  };

  const MATERIALS: { cat: string; brand1: string; brand2: string; key: string; unit: string; qty: string }[] = [
    { cat: "Cement", brand1: "UltraTech", brand2: "Ambuja", key: "cement_bag_50kg", unit: "/50kg bag", qty: "~8 bags/100sqft slab" },
    { cat: "Steel TMT", brand1: "Tata Tiscon", brand2: "Jindal Panther", key: "steel_tmt_ton", unit: "/tonne", qty: "~4 kg/sqft (residential)" },
    { cat: "Bricks", brand1: "Local Kiln", brand2: "Fly Ash (AAC)", key: "bricks_1000", unit: "/1000 pcs", qty: "~500 bricks/100sqft wall" },
    { cat: "Paint", brand1: "Asian Paints", brand2: "Berger", key: "paint_litre", unit: "/litre", qty: "~0.14 ltr/sqft (2 coats)" },
    { cat: "Flooring", brand1: "Kajaria", brand2: "Somany", key: "tiles_sqft", unit: "/sqft", qty: "1.1 sqft/sqft (wastage)" },
    { cat: "River Sand", brand1: "Local", brand2: "M-Sand", key: "river_sand_cft", unit: "/cft", qty: "Varies by mix design" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-skov-gold/15 text-skov-gold"><Package className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Material Budget Bot</h2>
          <p className="text-sm text-skov-cream/60">Share your city, area, and construction stage. I will estimate material quantity and budget range.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {PRIORITY_CITIES.map((c) => (
          <button key={c} onClick={() => setCity(c)} className={`rounded-full border px-3 py-1.5 text-xs transition ${city === c ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{c}</button>
        ))}
        <button onClick={doFetch} disabled={loading} className="ml-auto btn-gold !py-1.5 !px-4 text-sm">
          {loading ? <><Loader2 className="h-3 w-3 animate-spin" /> Fetching…</> : <><RefreshCw className="h-3 w-3" /> Check Current Material Prices</>}
        </button>
      </div>
      {prices && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-skov-cream/50">
            <span className="rounded-full bg-yellow-500/15 border border-yellow-500/30 px-2 py-0.5 text-[10px] text-yellow-400 font-medium">APPROXIMATE</span>
            <span>{prices.city} • {prices.timestamp}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-skov-gold/15">
                  <th className="text-left py-2 text-skov-cream/60">Material</th>
                  <th className="text-left py-2 text-skov-cream/60">Approx Qty</th>
                  <th className="text-right py-2 text-skov-cream/60">{MATERIALS[0].brand1}</th>
                  <th className="text-right py-2 text-skov-cream/60">{MATERIALS[0].brand2}</th>
                  <th className="text-right py-2 text-skov-gold font-medium">Market Rate</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((b) => {
                  const base = (prices!.rates as unknown as Record<string, number>)[b.key] ?? 0;
                  const b1 = Math.round(base * (0.97 + Math.random() * 0.06));
                  const b2 = Math.round(base * (0.94 + Math.random() * 0.08));
                  return (
                    <tr key={b.cat} className="border-b border-skov-gold/10 hover:bg-white/[0.02]">
                      <td className="py-3 text-skov-cream/80">{b.cat}<div className="text-[10px] text-skov-cream/40">{b.unit}</div></td>
                      <td className="py-3 text-skov-cream/60 text-[10px]">{b.qty}</td>
                      <td className="text-right py-3 text-skov-cream/70">₹{b1.toLocaleString("en-IN")}</td>
                      <td className="text-right py-3 text-skov-cream/70">₹{b2.toLocaleString("en-IN")}</td>
                      <td className="text-right py-3 font-semibold text-skov-gold">₹{base.toLocaleString("en-IN")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <EstimateDisclaimer />
          <div className="text-xs text-skov-cream/40 mt-2">Live local supplier quotation is required for final price confirmation.</div>
          <BotCTA label="Check current material prices" icon={Package} />
        </motion.div>
      )}
      {!prices && !loading && (
        <div className="card-dark flex flex-col items-center justify-center gap-3 p-10 text-center">
          <Package className="h-10 w-10 text-skov-gold/30" />
          <p className="text-sm text-skov-cream/50">Select city and click to check current material prices</p>
        </div>
      )}
    </div>
  );
}

function ProgressBot() {
  const [week, setWeek] = useState(6);
  const [uploaded, setUploaded] = useState(false);
  const [cityInput, setCityInput] = useState("Raipur");
  const stageIdx = Math.min(Math.round((week / 52) * PROGRESS_STAGES.length), PROGRESS_STAGES.length - 1);
  const pct = Math.round((week / 52) * 100);
  const risk = pct > 90 ? "On Track" : pct > 60 ? "Minor Delay" : pct > 30 ? "Needs Attention" : "On Track";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-500/15 text-teal-400"><Activity className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Site Progress Bot</h2>
          <p className="text-sm text-skov-cream/60">Upload your site photo or progress update. I will help you identify the current stage, pending work, and next action.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-gold">Your City</label>
          <input className="input-dark" value={cityInput} onChange={(e) => setCityInput(e.target.value)} placeholder="e.g. Raipur" />
        </div>
        <UploadZone onUpload={() => setUploaded(true)} label="Upload this week&apos;s site photo" />
      </div>
      {uploaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div>
            <label className="label-gold">Week of Construction: <span className="text-skov-gold">Week {week}</span></label>
            <input type="range" min={1} max={52} value={week} onChange={(e) => setWeek(+e.target.value)} className="w-full accent-skov-gold" />
          </div>
          <div className="card-dark p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-skov-cream">Overall Progress</span>
              <span className="text-skov-gold font-bold">{pct}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-skov-darkgold to-skov-gold" />
            </div>
            {/* Progress table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-skov-gold/15"><th className="text-left py-1.5 text-skov-cream/60">Stage</th><th className="text-left py-1.5 text-skov-cream/60">Status</th><th className="text-left py-1.5 text-skov-cream/60">Risk</th><th className="text-left py-1.5 text-skov-cream/60">Next Action</th></tr></thead>
                <tbody>
                  {PROGRESS_STAGES.map((s, i) => (
                    <tr key={s} className={`border-b border-skov-gold/10 ${i === stageIdx ? "bg-skov-gold/5" : ""}`}>
                      <td className="py-2 text-skov-cream/80">{s}</td>
                      <td className="py-2"><span className={`text-xs ${i < stageIdx ? "text-green-400" : i === stageIdx ? "text-skov-gold" : "text-skov-cream/40"}`}>{i < stageIdx ? "✅ Done" : i === stageIdx ? "🔄 In Progress" : "⬜ Pending"}</span></td>
                      <td className="py-2"><span className={`text-xs ${i <= stageIdx ? "text-green-400" : "text-skov-cream/30"}`}>{i <= stageIdx ? risk : "—"}</span></td>
                      <td className="py-2 text-xs text-skov-cream/50">{i === stageIdx ? "Monitor daily & check quality" : i < stageIdx ? "Completed" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-xs text-skov-cream/40 flex items-start gap-1.5">
            <AlertCircle className="h-3 w-3 flex-shrink-0 mt-0.5 text-skov-gold/60" />
            <span>Final construction quality cannot be certified from a photo only. Site inspection by a qualified professional is required for structural assessment.</span>
          </div>
          <BotCTA label="Share your site photo" icon={Camera} />
        </motion.div>
      )}
    </div>
  );
}

function InteriorBot() {
  const [room, setRoom] = useState("Kitchen");
  const [aesthetics, setAesthetics] = useState("Modern");
  const [generated, setGenerated] = useState(false);
  const [cityInput, setCityInput] = useState("Raipur");
  const roomList = ["Kitchen", "Bedroom", "Living Room", "Bathroom"];
  const styleList = Object.keys(INTERIOR_STYLES);
  const style = INTERIOR_STYLES[aesthetics];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-500/15 text-pink-400"><Palette className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Interior Style Bot</h2>
          <p className="text-sm text-skov-cream/60">Share your room type, size, budget, and style preference. I will suggest a practical interior concept.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="label-gold">City</label>
          <input className="input-dark" value={cityInput} onChange={(e) => setCityInput(e.target.value)} placeholder="e.g. Raipur" />
        </div>
        <div>
          <label className="label-gold">Room</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {roomList.map((r) => (
              <button key={r} onClick={() => setRoom(r)} className={`rounded-full border px-3 py-1.5 text-xs transition ${room === r ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{r}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="label-gold">Aesthetic Style</label>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {styleList.map((s) => (
              <button key={s} onClick={() => setAesthetics(s)} className={`rounded-full border px-2.5 py-1 text-[10px] transition ${aesthetics === s ? "border-skov-gold bg-skov-gold/15 text-skov-gold" : "border-skov-gold/20 hover:border-skov-gold/40"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => setGenerated(true)} className="btn-gold"><Palette className="h-4 w-4" />Generate Style Concept</button>
      {generated && style && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card-dark p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-skov-cream">{aesthetics} — {room}</h3>
              <span className="rounded-full bg-yellow-500/15 border border-yellow-500/30 px-2 py-0.5 text-[10px] text-yellow-400 font-medium">CONCEPT ONLY</span>
            </div>
            <div>
              <p className="text-xs text-skov-cream/60 mb-2">Colour Palette</p>
              <div className="flex gap-2 flex-wrap">
                {style.palette.map((hex) => (
                  <div key={hex} className="flex flex-col items-center gap-1">
                    <div className="h-10 w-10 rounded-lg border border-white/10 shadow-md" style={{ backgroundColor: hex }} />
                    <span className="text-[9px] text-skov-cream/50 font-mono">{hex}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-skov-cream/60 mb-2">Recommended Materials</p>
              <div className="flex flex-wrap gap-2">
                {style.materials.map((m) => (
                  <span key={m} className="rounded-full border border-skov-gold/25 bg-skov-gold/5 px-3 py-1 text-xs text-skov-cream/75">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-skov-cream/60 mb-1">Lighting Scheme</p>
              <p className="text-sm text-skov-cream/80">{style.lighting}</p>
            </div>
            <div className="rounded-xl bg-skov-gold/10 border border-skov-gold/25 p-3">
              <p className="text-xs text-skov-gold mb-1">✦ Practical Tip</p>
              <p className="text-sm text-skov-cream/80">{style.tip}</p>
            </div>
          </div>
          <EstimateDisclaimer />
          <BotCTA label="Share your room size" icon={Palette} />
        </motion.div>
      )}
    </div>
  );
}

function QABot() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Ask anything about joining SKOV GROUP as a contractor, free profile listing, leads, SKOV Verified application, or any construction question in Hindi or English! 🏗️" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    const u = input.trim();
    setMsgs((m) => [...m, { role: "user", text: u, ts: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: getQAReply(u), ts: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 700);
  };

  const QUICK = [
    "How to join SKOV?", "SKOV Verified kya hai?", "Documents needed?",
    "Kya leads milenge?", "Plastering tips", "Cement brand?",
    "Steel quality check", "Foundation depth", "Tiles kaunsi?", "Paint advice",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/15 text-amber-400"><HelpCircle className="h-5 w-5" /></div>
        <div>
          <h2 className="font-display text-2xl">Contractor Q&A Bot</h2>
          <p className="text-sm text-skov-cream/60">Ask about joining SKOV GROUP, free profile listing, leads, SKOV Verified, or any construction question in Hinglish / English.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button key={q} onClick={() => { setInput(q); }} className="rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1 text-xs text-amber-300/80 hover:border-amber-400/50 transition">{q}</button>
        ))}
      </div>
      <div className="card-dark flex flex-col" style={{ height: 400 }}>
        <div className="flex-1 overflow-y-auto space-y-3 p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "bot" && <div className="mr-2 mt-1 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-400"><HelpCircle className="h-3.5 w-3.5" /></div>}
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "bg-skov-gold text-skov-black" : "bg-white/5 border border-skov-gold/15 text-skov-cream"}`}>
                {m.text}
                {m.ts && <div className="mt-1 text-[9px] opacity-40">{m.ts}</div>}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2 border-t border-skov-gold/15 p-3">
          <input className="input-dark !py-2 text-sm" placeholder="Poochho kuch bhi... (Ask anything in Hindi or English)" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
          <button onClick={send} className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-skov-gold text-skov-black"><Send className="h-4 w-4" /></button>
        </div>
      </div>
      <BotCTA label="Register as a contractor" icon={Users} />
    </div>
  );
}

// ── SKOV Coins Panel ──────────────────────────────────────────────────────
function CoinsPanel({ coins, onEarn, onRedeem }: {
  coins: CoinsState;
  onEarn: (id: string, label: string, amt: number) => void;
  onRedeem: (label: string, cost: number) => boolean;
}) {
  const [tab, setTab] = useState<"earn" | "redeem" | "history">("earn");
  const [modals, setModals] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const openModal = (id: string) => setModals((m) => ({ ...m, [id]: true }));
  const closeModal = (id: string) => setModals((m) => ({ ...m, [id]: false }));

  const earnAction = (id: string, label: string, amt: number) => {
    onEarn(id, label, amt);
    closeModal(id);
  };

  const redeemAction = (id: string, label: string, cost: number) => {
    const ok = onRedeem(label, cost);
    if (ok) setUnlocked((u) => [...u, id]);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <div className="card-dark relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-gold-radial opacity-80 pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-skov-gold/80">
              <Coins className="h-3.5 w-3.5" />SKOV Coins Balance
            </div>
            <motion.div
              key={coins.balance}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-2 font-display text-5xl gold-text"
            >
              {coins.balance.toLocaleString("en-IN")}
            </motion.div>
            <p className="mt-1 text-xs text-skov-cream/60">Earn coins for useful actions and unlock planning support</p>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-skov-gold/30 bg-skov-gold/10">
            <Award className="h-8 w-8 text-skov-gold" />
          </div>
        </div>
        <div className="relative mt-4 flex gap-2">
          {[["earn", "Earn Coins"], ["redeem", "Redeem"], ["history", "History"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as typeof tab)} className={`rounded-full border px-4 py-1.5 text-xs transition ${tab === id ? "border-skov-gold bg-skov-gold/20 text-skov-gold" : "border-skov-gold/25 text-skov-cream/60 hover:border-skov-gold/50"}`}>{label}</button>
          ))}
        </div>
      </div>

      {tab === "earn" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {EARN_ACTIONS.map((a) => {
            const isDone = (a.id === "daily" && coins.dailyClaimed) || (a.id === "profile" && coins.profileDone) || (a.id === "review" && coins.reviewDone);
            return (
              <div key={a.id} className={`card-dark p-4 flex items-center justify-between gap-3 ${isDone ? "opacity-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold"><a.icon className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-medium text-skov-cream">{a.label}</div>
                    <div className="text-xs text-skov-cream/50">{a.desc}</div>
                  </div>
                </div>
                {isDone ? (
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                ) : (
                  <button onClick={() => openModal(a.id)} className="flex-shrink-0 rounded-full border border-skov-gold/40 px-3 py-1 text-xs text-skov-gold hover:bg-skov-gold/10 transition">
                    +{a.coins}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "redeem" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {REDEEM_ACTIONS.map((a) => {
            const isUnlocked = unlocked.includes(a.id);
            const canAfford = coins.balance >= a.coins;
            return (
              <div key={a.id} className="card-dark p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`grid h-9 w-9 place-items-center rounded-xl ${canAfford ? "bg-skov-gold/10 text-skov-gold" : "bg-white/5 text-skov-cream/30"}`}><a.icon className="h-4 w-4" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-skov-cream truncate">{a.label}</div>
                    <div className="text-xs text-skov-cream/50">{a.desc}</div>
                  </div>
                </div>
                {isUnlocked ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-400"><Unlock className="h-3 w-3" />Unlocked!</div>
                ) : (
                  <button
                    onClick={() => redeemAction(a.id, a.label, a.coins)}
                    disabled={!canAfford}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium transition ${canAfford ? "bg-skov-gold/15 border border-skov-gold/40 text-skov-gold hover:bg-skov-gold/25" : "bg-white/5 border border-skov-gold/10 text-skov-cream/30 cursor-not-allowed"}`}
                  >
                    <Coins className="h-3 w-3" />{a.coins} coins {!canAfford && <Lock className="h-3 w-3" />}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {coins.history.length === 0 && (
            <div className="card-dark flex flex-col items-center gap-3 p-8 text-center">
              <Coins className="h-8 w-8 text-skov-gold/30" />
              <p className="text-sm text-skov-cream/50">No transactions yet. Earn your first coins!</p>
            </div>
          )}
          {[...coins.history].reverse().map((h, i) => (
            <div key={i} className="card-dark flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm text-skov-cream/80">{h.label}</div>
                <div className="text-xs text-skov-cream/40">{h.ts}</div>
              </div>
              <CoinBadge amount={Math.abs(h.amount)} sign={h.amount >= 0 ? "+" : "-"} />
            </div>
          ))}
        </div>
      )}

      {/* Earn Modals */}
      <AnimatePresence>
        {EARN_ACTIONS.filter((a) => modals[a.id]).map((action) => (
          <motion.div key={action.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="card-dark w-full max-w-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">{action.label}</h3>
                <button onClick={() => closeModal(action.id)} className="text-skov-cream/50 hover:text-skov-gold"><X className="h-4 w-4" /></button>
              </div>
              {action.id === "daily" && (
                <div className="text-center space-y-3 py-2">
                  <Flame className="h-10 w-10 text-skov-gold mx-auto" />
                  <p className="text-skov-cream/70">Claim your daily check-in bonus!</p>
                  <button onClick={() => earnAction("daily", "Daily Login", 5)} className="btn-gold w-full">Claim +5 SKOV Coins</button>
                </div>
              )}
              {action.id === "profile" && (
                <div className="space-y-3">
                  {[["Name", "Your full name"], ["Phone", "+91 XXXXX XXXXX"], ["City", "Your city"]].map(([l, p]) => (
                    <div key={l}>
                      <label className="label-gold">{l}</label>
                      <input className="input-dark" placeholder={p} onChange={(e) => setFormData((f) => ({ ...f, [l.toLowerCase()]: e.target.value }))} />
                    </div>
                  ))}
                  <button onClick={() => earnAction("profile", "Complete Profile", 50)} className="btn-gold w-full">Save & Earn +50 Coins</button>
                </div>
              )}
              {(action.id === "ref_contractor" || action.id === "ref_owner") && (
                <div className="space-y-3">
                  {[["Name", "Their full name"], ["Phone", "+91 XXXXX XXXXX"], ...(action.id === "ref_contractor" ? [["Specialty", "e.g. Residential"]] : [])].map(([l, p]) => (
                    <div key={l as string}>
                      <label className="label-gold">{l}</label>
                      <input className="input-dark" placeholder={p as string} />
                    </div>
                  ))}
                  <button onClick={() => earnAction(action.id, action.label, action.coins)} className="btn-gold w-full">Submit & Earn +{action.coins} Coins</button>
                </div>
              )}
              {(action.id === "upload" || action.id === "review") && (
                <div className="space-y-3">
                  {action.id === "review" && (
                    <div>
                      <label className="label-gold">Contractor / Project</label>
                      <input className="input-dark" placeholder="Contractor name or project address" />
                      <label className="label-gold mt-3">Your Review</label>
                      <textarea className="input-dark !h-20 resize-none" placeholder="Share your honest experience…" />
                    </div>
                  )}
                  {action.id === "upload" && (
                    <UploadZone onUpload={() => {}} label="Upload your project requirement document" />
                  )}
                  <button onClick={() => earnAction(action.id, action.label, action.coins)} className="btn-gold w-full">Submit & Earn +{action.coins} Coins</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Main Hub Page ─────────────────────────────────────────────────────────
export default function AiBotHubPage() {
  const [activeBot, setActiveBot] = useState<BotId>("sketch3d");
  const [showCoins, setShowCoins] = useState(false);
  const [coins, setCoins] = useState<CoinsState>(defaultCoins());
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load coins from localStorage on mount
  useEffect(() => {
    const saved = loadCoins();
    // Reset daily claim if it's a new day
    const lastDay = localStorage.getItem("skov_last_day");
    if (lastDay !== TODAY) {
      saved.dailyClaimed = false;
      localStorage.setItem("skov_last_day", TODAY);
    }
    setCoins(saved);
  }, []);

  const addCoins = useCallback((label: string, amt: number) => {
    setCoins((prev) => {
      const next = {
        ...prev,
        balance: prev.balance + amt,
        history: [...prev.history, { label, amount: amt, ts: new Date().toLocaleString("en-IN") }],
      };
      saveCoins(next);
      return next;
    });
    setToast(`+${amt} SKOV Coins earned: ${label}!`);
  }, []);

  const earnCoins = useCallback((id: string, label: string, amt: number) => {
    setCoins((prev) => {
      const updates: Partial<CoinsState> = {
        balance: prev.balance + amt,
        history: [...prev.history, { label, amount: amt, ts: new Date().toLocaleString("en-IN") }],
      };
      if (id === "daily") updates.dailyClaimed = true;
      if (id === "profile") updates.profileDone = true;
      if (id === "review") updates.reviewDone = true;
      const next = { ...prev, ...updates } as CoinsState;
      saveCoins(next);
      return next;
    });
    setToast(`+${amt} SKOV Coins: ${label}!`);
  }, []);

  const redeemCoins = useCallback((label: string, cost: number): boolean => {
    let ok = false;
    setCoins((prev) => {
      if (prev.balance < cost) { setToast(`Not enough coins! Need ${cost} coins.`); return prev; }
      ok = true;
      const next = {
        ...prev,
        balance: prev.balance - cost,
        history: [...prev.history, { label: `Redeemed: ${label}`, amount: -cost, ts: new Date().toLocaleString("en-IN") }],
      };
      saveCoins(next);
      setToast(`✅ Unlocked: ${label}`);
      return next;
    });
    return ok;
  }, []);

  const bot = BOTS.find((b) => b.id === activeBot)!;
  const coreBots = BOTS.filter((b) => b.category === "core");
  const dailyBots = BOTS.filter((b) => b.category === "daily");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-2 inline-flex items-center gap-2 rounded-full border border-skov-gold/40 bg-skov-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-skov-gold">
            <Bot className="h-3 w-3" />AI Bot Suite • 10 Specialist Tools
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="font-display text-4xl md:text-5xl">
            SKOV <span className="gold-text">AI Assistant Hub</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-2 text-skov-cream/60">
            Free construction & real estate AI tools • Chhattisgarh priority • Honest estimates
          </motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
          onClick={() => setShowCoins(!showCoins)}
          className="flex items-center gap-3 rounded-2xl border border-skov-gold/40 bg-skov-gold/10 px-5 py-3 hover:bg-skov-gold/20 transition"
        >
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-skov-gold/20">
            <Coins className="h-4 w-4 text-skov-gold" />
          </div>
          <div className="text-left">
            <div className="text-xs text-skov-cream/60">SKOV Coins</div>
            <div className="font-bold text-skov-gold gold-text">{coins.balance.toLocaleString("en-IN")}</div>
          </div>
          <ChevronDown className={`h-4 w-4 text-skov-gold transition ${showCoins ? "rotate-180" : ""}`} />
        </motion.button>
      </div>

      {/* Coins Panel Expandable */}
      <AnimatePresence>
        {showCoins && (
          <motion.div
            key="coins-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <CoinsPanel coins={coins} onEarn={earnCoins} onRedeem={redeemCoins} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className={`flex-shrink-0 transition-all ${sidebarOpen ? "w-64" : "w-14"}`}
        >
          <div className="card-dark sticky top-24 overflow-hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex w-full items-center justify-between border-b border-skov-gold/15 px-4 py-3 text-xs uppercase tracking-widest text-skov-gold/80 hover:text-skov-gold transition">
              {sidebarOpen && <span>Bot Suite</span>}
              <ChevronRight className={`h-4 w-4 transition ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
            <div className="py-2">
              {sidebarOpen && <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-skov-cream/40">Core Conversion Bots</p>}
              {coreBots.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBot(b.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${activeBot === b.id ? "bg-skov-gold/10 border-r-2 border-skov-gold" : "hover:bg-white/[0.03]"}`}
                >
                  <div className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg ${activeBot === b.id ? "bg-skov-gold/20 text-skov-gold" : "bg-white/5 text-skov-cream/60"}`}>
                    <b.icon className="h-4 w-4" />
                  </div>
                  {sidebarOpen && (
                    <div className="min-w-0 flex-1">
                      <div className={`truncate text-sm ${activeBot === b.id ? "text-skov-cream font-medium" : "text-skov-cream/70"}`}>{b.label}</div>
                      <div className={`text-[10px] ${b.tagColor}`}>{b.tag}</div>
                    </div>
                  )}
                </button>
              ))}
              {sidebarOpen && <p className="mt-2 px-4 py-1 text-[10px] uppercase tracking-widest text-skov-cream/40">Daily Planning Tools</p>}
              {dailyBots.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBot(b.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${activeBot === b.id ? "bg-skov-gold/10 border-r-2 border-skov-gold" : "hover:bg-white/[0.03]"}`}
                >
                  <div className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg ${activeBot === b.id ? "bg-skov-gold/20 text-skov-gold" : "bg-white/5 text-skov-cream/60"}`}>
                    <b.icon className="h-4 w-4" />
                  </div>
                  {sidebarOpen && (
                    <div className="min-w-0 flex-1">
                      <div className={`truncate text-sm ${activeBot === b.id ? "text-skov-cream font-medium" : "text-skov-cream/70"}`}>{b.label}</div>
                      <div className={`text-[10px] ${b.tagColor}`}>{b.tag}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="min-w-0 flex-1"
        >
          {/* Active Bot Header */}
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
              <bot.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-skov-cream">{bot.label}</span>
                <span className={`text-xs ${bot.tagColor}`}>● {bot.tag}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-skov-cream/50">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Online • Free to use
              </div>
            </div>
          </div>

          <div className="card-dark p-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeBot} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {activeBot === "sketch3d" && <Sketch3DBot />}
                {activeBot === "costbot" && <CostBot onEarnCoins={addCoins} />}
                {activeBot === "contractorbot" && <ContractorBot />}
                {activeBot === "renovationbot" && <RenovationBot />}
                {activeBot === "leadbot" && <LeadBot onEarnCoins={addCoins} />}
                {activeBot === "planbot" && <PlanBot />}
                {activeBot === "materialbot" && <MaterialBot />}
                {activeBot === "progressbot" && <ProgressBot />}
                {activeBot === "interiorbot" && <InteriorBot />}
                {activeBot === "qabot" && <QABot />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Free AI positioning */}
          <div className="mt-4 flex items-center gap-2 text-xs text-skov-cream/40">
            <Sparkles className="h-3 w-3 text-skov-gold/60" />
            <span>SKOV AI tools are free to use for planning, estimation, comparison, and guidance. Final contractor work, materials, drawings, approvals, and site execution may involve separate professional costs.</span>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast} msg={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
