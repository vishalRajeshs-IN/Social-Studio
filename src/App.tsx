import { useMemo, useState } from "react";
import { ArrowUpRight, Bot, CheckCircle2, ChevronDown, CircleHelp, CloudUpload, Layers3, WandSparkles } from "lucide-react";
import CampaignDashboard from "./components/CampaignDashboard";
import { defaultCampaign } from "./types/campaign";
import type { CampaignData } from "./types/campaign";

export default function App() {
  const [campaign, setCampaign] = useState<CampaignData>(defaultCampaign);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const imageUrl = useMemo(() => productImage, [productImage]);

  function updateProduct<K extends keyof CampaignData["product"]>(key: K, value: CampaignData["product"][K]) {
    setCampaign(current => ({ ...current, product: { ...current.product, [key]: value } }));
  }

  function onImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please choose an image file."); return; }
    if (file.size > 12 * 1024 * 1024) { alert("Please use an image under 12 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setProductImage(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  function generateCampaign() {
    const product = campaign.product;
    const name = product.name.trim() || "Your Product";
    setCampaign(current => ({
      ...current,
      product: { ...current.product, name },
      reel: { ...current.reel, hook: `${name.toUpperCase()}\nMADE TO STAND OUT.`, featureLabels: current.product.features.map(f => f.toUpperCase()) as [string, string, string], cta: product.callToAction.toUpperCase() },
      poster: { ...current.poster, headline: `${name.toUpperCase()}.\nMADE ICONIC.`, subheadline: product.tagline || product.description, cta: product.callToAction.toUpperCase() },
      carouselSlides: [
        { kicker: "01 / INTRODUCING", title: `Meet ${name}.`, body: product.description },
        { kicker: "02 / THE BENEFIT", title: product.features[0] || "Made for your day.", body: `Designed for ${product.audience || "everyday life"}.` },
        { kicker: "03 / THE DETAILS", title: product.features[1] || "Thoughtful by design.", body: product.features[2] || product.tagline },
        { kicker: "04 / WHY IT MATTERS", title: "Small upgrade. Big feeling.", body: product.tagline || product.description },
        { kicker: "05 / YOUR NEXT STEP", title: "Make it yours.", body: `${product.callToAction}${product.price ? ` · ${product.price}` : ""}` }
      ],
      socialCopy: {
        ...current.socialCopy,
        instagram: `Meet ${name} ✨ ${product.description} ${product.callToAction}.`,
        linkedin: `Introducing ${name}: ${product.description} Designed for ${product.audience || "everyday customers"}. ${product.callToAction}.`
      }
    }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return <div className="app-shell">
    <header className="topbar"><div className="logo-mark"><Bot size={20}/></div><div className="brand-name">social<span>studio</span><small>CAMPAIGN WORKSPACE</small></div><div className="topbar-spacer"/><div className="workspace-pill"><span/> Workspace / Product launch <ChevronDown size={14}/></div><button className="help-button" title="Help"><CircleHelp size={19}/></button><div className="avatar">VS</div></header>
    <main className="main-content">
      <div className="page-heading"><div><div className="breadcrumb">WORKSPACE <span>/</span> CAMPAIGN BUILDER</div><h1>Turn a product into a <span>campaign.</span></h1><p>One product photo. A full week of scroll-stopping content.</p></div><div className="heading-badge"><WandSparkles size={15}/> CREATIVE AI WORKSPACE</div></div>
      <section className="product-setup">
        <button className="setup-title" onClick={() => setDetailsOpen(!detailsOpen)}><span className="setup-icon"><Layers3 size={18}/></span><span><b>Campaign inputs</b><small>Shape the story before you launch</small></span><span className="step-label">STEP 01 / 02</span><ChevronDown className={detailsOpen ? "chevron-open" : ""} size={18}/></button>
        {detailsOpen && <div className="setup-grid">
          <label className="upload-zone">{imageUrl ? <img src={imageUrl} alt="Uploaded product" className="upload-thumb"/> : <span className="upload-icon"><CloudUpload size={24}/></span>}<b>{imageUrl ? "Product photo added" : "Upload product photo"}</b><small>PNG, JPG or WEBP · Max 12 MB</small><span className="upload-choose">{imageUrl ? "Change image" : "Browse files"}</span><input type="file" accept="image/*" onChange={onImage} hidden/></label>
          <div className="form-grid">
            <label>Product name<input value={campaign.product.name} onChange={e => updateProduct("name", e.target.value)} placeholder="e.g. AURA Bottle"/></label>
            <label>Tagline<input value={campaign.product.tagline} onChange={e => updateProduct("tagline", e.target.value)} placeholder="A short, memorable line"/></label>
            <label className="span-two">Product description<textarea value={campaign.product.description} onChange={e => updateProduct("description", e.target.value)} rows={2} placeholder="What makes this product special?"/></label>
            <label>Target audience<input value={campaign.product.audience} onChange={e => updateProduct("audience", e.target.value)} placeholder="Who is it for?"/></label>
            <label>Price (optional)<input value={campaign.product.price} onChange={e => updateProduct("price", e.target.value)} placeholder="e.g. ₹1,299"/></label>
            <label>Feature 1<input value={campaign.product.features[0]} onChange={e => updateProduct("features", [e.target.value, campaign.product.features[1], campaign.product.features[2]])} /></label>
            <label>Feature 2<input value={campaign.product.features[1]} onChange={e => updateProduct("features", [campaign.product.features[0], e.target.value, campaign.product.features[2]])} /></label>
            <label>Feature 3<input value={campaign.product.features[2]} onChange={e => updateProduct("features", [campaign.product.features[0], campaign.product.features[1], e.target.value])} /></label>
            <label>Call to action<input value={campaign.product.callToAction} onChange={e => updateProduct("callToAction", e.target.value)} /></label>
          </div>
        </div>}
        <div className="setup-footer"><span><CheckCircle2 size={15}/> Your inputs stay in this browser session</span><button className="button button-generate" onClick={generateCampaign}><WandSparkles size={17}/>{saved ? "Campaign refreshed!" : "Generate campaign"} <ArrowUpRight size={16}/></button></div>
      </section>
      <div className="section-heading"><div><p className="eyebrow">STEP 02 / 02</p><h2>Your campaign studio</h2><p>Preview, fine-tune, and export every creative in one place.</p></div><div className="asset-count"><span className="asset-count-number">05</span><span>CAMPAIGN<br/>ASSETS</span></div></div>
      <CampaignDashboard campaign={campaign} setCampaign={setCampaign} productImage={imageUrl}/>
      <footer className="footer"><span>✦ Built for bold launches.</span><span>Social Studio <b>·</b> Front-end prototype</span></footer>
    </main>
  </div>;
}