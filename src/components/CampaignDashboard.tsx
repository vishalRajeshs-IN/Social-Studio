import { useState } from "react";
import { CalendarDays, Check, Clipboard, Download, Image as ImageIcon, Palette, Play, Sparkles, Type } from "lucide-react";
import { Player } from "@remotion/player";
import { AdReel, REEL_DURATION_FRAMES, REEL_FPS, REEL_HEIGHT, REEL_WIDTH } from "../remotion/AdReel";
import PosterPreview from "./previews/PosterPreview";
import CarouselPreview from "./previews/CarouselPreview";
import type { CampaignData, BrandTheme } from "../types/campaign";

type Tab = "poster" | "reel" | "carousel" | "copy" | "schedule";
const tabs: { id: Tab; label: string; icon: typeof ImageIcon }[] = [
  { id: "poster", label: "Launch Poster", icon: ImageIcon }, { id: "reel", label: "9:16 Reel", icon: Play },
  { id: "carousel", label: "Carousel", icon: Sparkles }, { id: "copy", label: "Captions & Copy", icon: Type }, { id: "schedule", label: "Schedule", icon: CalendarDays }
];

export default function CampaignDashboard({ campaign, setCampaign, productImage }: { campaign: CampaignData; setCampaign: (next: CampaignData) => void; productImage: string | null }) {
  const [tab, setTab] = useState<Tab>("poster");
  const [copied, setCopied] = useState(false);
  const updateTheme = (key: keyof BrandTheme, value: string) => setCampaign({ ...campaign, brandTheme: { ...campaign.brandTheme, [key]: value } });

  async function copyCaptions() {
    const text = `${campaign.socialCopy.instagram}\n\n${campaign.socialCopy.hashtags.join(" ")}`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { alert(text); }
  }

  return <div className="dashboard-layout">
    <aside className="sidebar">
      <div className="sidebar-title"><Palette size={17}/><span>Brand theme</span><span className="live-pill">LIVE</span></div>
      <p className="muted small">Adjust the palette and every creative updates instantly.</p>
      {([{ key: "primary", label: "Primary color" }, { key: "accent", label: "Accent color" }, { key: "background", label: "Background" }] as const).map(({ key, label }) =>
        <label className="color-field" key={key}><span>{label}</span><div className="color-input-wrap"><input type="color" value={campaign.brandTheme[key]} onChange={e => updateTheme(key, e.target.value)} /><input aria-label={`${label} hex value`} className="hex-input" value={campaign.brandTheme[key]} maxLength={7} onChange={e => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && updateTheme(key, e.target.value)} /></div></label>
      )}
      <div className="palette-swatches"><span style={{ background: campaign.brandTheme.primary }}/><span style={{ background: campaign.brandTheme.accent }}/><span style={{ background: campaign.brandTheme.background }}/></div>
      <div className="sidebar-tip"><Sparkles size={16}/><p><b>Creative tip</b><br/>Keep strong contrast between your background and accent to make CTAs pop on mobile.</p></div>
      <div className="asset-status"><span className="status-dot"/> 5 assets prepared <span>·</span> 7-day plan</div>
    </aside>
    <section className="workspace">
      <div className="tabs">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={`tab ${tab === id ? "selected" : ""}`} onClick={() => setTab(id)}><Icon size={16}/>{label}</button>)}</div>
      {tab === "poster" && <PosterPreview campaign={campaign} productImage={productImage}/>}
      {tab === "carousel" && <CarouselPreview campaign={campaign} productImage={productImage}/>}
      {tab === "reel" && <div className="preview-column">
        <div className="preview-heading"><div><p className="eyebrow">CAMPAIGN ASSET / 02</p><h2>Vertical launch reel</h2><p className="muted">15 seconds · 9:16 · 30 fps · live preview</p></div><span className="format-pill">1080 × 1920</span></div>
        <div className="reel-stage"><div className="reel-player"><Player component={AdReel} inputProps={{ campaign, productImage }} durationInFrames={REEL_DURATION_FRAMES} fps={REEL_FPS} compositionWidth={REEL_WIDTH} compositionHeight={REEL_HEIGHT} style={{ width: "100%", aspectRatio: "9 / 16" }} controls autoPlay loop/></div>
          <div className="reel-notes"><div><span className="timeline-dot"/> <b>0–3 sec</b><p>Animated hook</p></div><div><span className="timeline-dot"/> <b>3–9 sec</b><p>Feature reveals</p></div><div><span className="timeline-dot"/> <b>9–15 sec</b><p>CTA pulse</p></div></div></div>
        <div className="voiceover-card"><div className="section-label">VOICEOVER SCRIPT <span>15 SEC</span></div><p>{campaign.reel.voiceover}</p><button className="button button-secondary" onClick={() => navigator.clipboard?.writeText(campaign.reel.voiceover)}><Clipboard size={15}/> Copy script</button></div>
        <p className="helper-text">Live preview only. To export an MP4, add a Remotion server/CLI rendering workflow; browser playback does not create a video file.</p>
      </div>}
      {tab === "copy" && <div className="preview-column">
        <div className="preview-heading"><div><p className="eyebrow">CAMPAIGN ASSET / 04</p><h2>Captions & copy</h2><p className="muted">Platform-ready copy with a reusable hashtag set.</p></div><button className="button button-primary" onClick={copyCaptions}>{copied ? <Check size={16}/> : <Clipboard size={16}/>} {copied ? "Copied!" : "Copy Instagram copy"}</button></div>
        <div className="copy-card"><div className="copy-card-heading"><span className="platform-icon instagram">ig</span><div><b>Instagram</b><small>Friendly · Benefit-led · Emoji-ready</small></div></div><p>{campaign.socialCopy.instagram}</p><div className="hashtags">{campaign.socialCopy.hashtags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <div className="copy-card"><div className="copy-card-heading"><span className="platform-icon linkedin">in</span><div><b>LinkedIn</b><small>Professional · Product story</small></div></div><p>{campaign.socialCopy.linkedin}</p><button className="button button-secondary" onClick={() => navigator.clipboard?.writeText(campaign.socialCopy.linkedin)}><Clipboard size={15}/> Copy LinkedIn caption</button></div>
        <div className="copy-card"><div className="section-label">HASHTAG SET <span>{campaign.socialCopy.hashtags.length} TAGS</span></div><div className="hashtags">{campaign.socialCopy.hashtags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </div>}
      {tab === "schedule" && <div className="preview-column">
        <div className="preview-heading"><div><p className="eyebrow">CAMPAIGN ASSET / 05</p><h2>7-day marketing schedule</h2><p className="muted">A suggested rollout to introduce, educate, and convert.</p></div><span className="format-pill"><CalendarDays size={14}/> 7 posts / touchpoints</span></div>
        <div className="schedule-list">{campaign.suggestedSchedule.map((item, index) => <div className="schedule-row" key={item.day}><div className="schedule-day"><span>{String(index + 1).padStart(2, "0")}</span><b>{item.day}</b></div><div className="schedule-main"><b>{item.content}</b><p>{item.channel}</p></div><span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span></div>)}</div>
        <p className="helper-text"><Download size={14}/> This is a suggested schedule; it does not publish posts or connect to social accounts.</p>
      </div>}
    </section>
  </div>;
}