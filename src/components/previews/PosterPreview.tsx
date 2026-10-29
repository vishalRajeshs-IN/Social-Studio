import { Download, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { CampaignData } from "../../types/campaign";

export default function PosterPreview({ campaign, productImage }: { campaign: CampaignData; productImage: string | null }) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const { brandTheme: theme, poster, product } = campaign;

  async function downloadPoster() {
    if (!posterRef.current) return;
    try {
      setExporting(true);
      const dataUrl = await toPng(posterRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: theme.background });
      const link = document.createElement("a");
      link.download = `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-launch-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Poster export failed", error);
      alert("Could not export the poster. Try another image or browser.");
    } finally { setExporting(false); }
  }

  return <div className="preview-column">
    <div className="preview-heading"><div><p className="eyebrow">CAMPAIGN ASSET / 01</p><h2>Launch poster</h2><p className="muted">A bold 9:16 launch creative, ready to export.</p></div><button className="button button-primary" onClick={downloadPoster} disabled={exporting}><Download size={16}/>{exporting ? "Exporting…" : "Download Poster"}</button></div>
    <div className="poster-stage">
      <div ref={posterRef} className="poster-canvas" style={{ background: `radial-gradient(circle at 80% 25%, ${theme.primary}b0, transparent 38%), linear-gradient(150deg, ${theme.background}, ${theme.primary}66)`, color: theme.text }}>
        <div className="poster-topline"><span className="brand-dot" style={{ background: theme.accent }} /> SOCIAL STUDIO <span className="poster-edition">NEW DROP / 2026</span></div>
        <div className="poster-badge" style={{ background: theme.accent, color: theme.background }}><Sparkles size={13}/>{poster.badge}</div>
        <h1 className="poster-title">{poster.headline}</h1>
        <p className="poster-subtitle">{poster.subheadline}</p>
        <div className="poster-product">
          {productImage ? <img src={productImage} alt={product.name} /> : <div className="poster-placeholder" style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})` }}><span>{product.name.slice(0, 1).toUpperCase()}</span></div>}
        </div>
        <div className="poster-bottom"><p className="poster-product-name">{product.name}</p><p className="poster-description">{product.description}</p><div className="poster-cta" style={{ background: theme.accent, color: theme.background }}>{poster.cta} ↗</div><p className="poster-footer">@YOURBRAND · MADE FOR YOUR EVERYDAY</p></div>
      </div>
    </div>
  </div>;
}