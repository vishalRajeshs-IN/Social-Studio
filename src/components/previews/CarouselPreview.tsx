import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { CampaignData } from "../../types/campaign";

export default function CarouselPreview({ campaign, productImage }: { campaign: CampaignData; productImage: string | null }) {
  const [active, setActive] = useState(0);
  const [exporting, setExporting] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const theme = campaign.brandTheme;
  const slide = campaign.carouselSlides[active];

  async function downloadSlide() {
    if (!slideRef.current) return;
    try {
      setExporting(true);
      const data = await toPng(slideRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: theme.background });
      const a = document.createElement("a");
      a.download = `${campaign.product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-carousel-${active + 1}.png`;
      a.href = data; a.click();
    } catch (error) { console.error(error); alert("Could not export this slide. Please try again."); }
    finally { setExporting(false); }
  }

  return <div className="preview-column">
    <div className="preview-heading"><div><p className="eyebrow">CAMPAIGN ASSET / 03</p><h2>Educational carousel</h2><p className="muted">Five square slides. Export each frame individually.</p></div><button className="button button-primary" onClick={downloadSlide} disabled={exporting}><Download size={16}/>{exporting ? "Exporting…" : "Download slide"}</button></div>
    <div className="carousel-layout">
      <button className="icon-button" aria-label="Previous slide" onClick={() => setActive((active + 4) % 5)}><ChevronLeft/></button>
      <div className="carousel-frame">
        <div ref={slideRef} className="carousel-canvas" style={{ background: `radial-gradient(circle at 90% 15%, ${theme.primary}a0, transparent 35%), ${theme.background}`, color: theme.text }}>
          <div className="carousel-brand"><span className="brand-dot" style={{ background: theme.accent }}/>{campaign.product.name.toUpperCase()} <span>{String(active + 1).padStart(2, "0")} / 05</span></div>
          <div className="carousel-orb" style={{ background: theme.primary }} />
          <p className="carousel-kicker" style={{ color: theme.accent }}>{slide.kicker}</p>
          <h2>{slide.title}</h2><p className="carousel-body">{slide.body}</p>
          {active === 0 && productImage && <img className="carousel-product" src={productImage} alt={campaign.product.name}/>}
          <div className="carousel-bottom"><span style={{ background: theme.accent }}/> SWIPE TO DISCOVER <span>↗</span></div>
        </div>
      </div>
      <button className="icon-button" aria-label="Next slide" onClick={() => setActive((active + 1) % 5)}><ChevronRight/></button>
    </div>
    <div className="carousel-dots" aria-label="Select slide">{campaign.carouselSlides.map((item, i) => <button key={item.kicker} aria-label={`Go to slide ${i + 1}`} className={i === active ? "dot active" : "dot"} onClick={() => setActive(i)}/>)}</div>
    <p className="helper-text">Tip: use the arrows to review all five slides, then download each one as a separate high-resolution PNG.</p>
  </div>;
}