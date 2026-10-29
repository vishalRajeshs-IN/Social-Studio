import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { CampaignData } from "../types/campaign";

export const REEL_FPS = 30;
export const REEL_DURATION_FRAMES = 450;
export const REEL_WIDTH = 1080;
export const REEL_HEIGHT = 1920;

export function AdReel({ campaign, productImage }: { campaign: CampaignData; productImage: string | null }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const hookOpacity = interpolate(frame, [0, 12, 78, 90], [0, 1, 1, 0.25], { extrapolateRight: "clamp" });
  const featureOpacity = (start: number) => interpolate(frame, [start, start + 12, start + 52, start + 66], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const ctaScale = frame < 270 ? 0.75 : 1 + Math.sin((frame - 270) / 7) * 0.045;
  const bob = Math.sin(frame / 11) * 18;
  const theme = campaign.brandTheme;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 75% 25%, ${theme.primary}88, transparent 38%), radial-gradient(circle at 15% 80%, ${theme.accent}30, transparent 30%), ${theme.background}`, color: theme.text, fontFamily: "Inter, ui-sans-serif, system-ui", overflow: "hidden", padding: 70 }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: theme.primary, filter: "blur(100px)", opacity: 0.22, top: 180, right: -220 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 27, fontWeight: 800, letterSpacing: 5, opacity: 0.9 }}>
        <span style={{ width: 20, height: 20, borderRadius: 6, background: theme.accent }} /> SOCIAL STUDIO
      </div>
      <div style={{ position: "absolute", top: 250, left: 70, right: 70, opacity: hookOpacity, transform: `translateY(${(1 - enter) * 80}px)` }}>
        <div style={{ color: theme.accent, fontSize: 27, fontWeight: 800, letterSpacing: 6, marginBottom: 25 }}>INTRODUCING</div>
        <div style={{ whiteSpace: "pre-line", fontSize: 94, lineHeight: 0.98, fontWeight: 950, letterSpacing: -4 }}>{campaign.reel.hook}</div>
      </div>
      <div style={{ position: "absolute", top: 710, left: 80, right: 80, height: 690, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {productImage ? <img src={productImage} style={{ maxWidth: "95%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 50px 55px #0009)", transform: `translateY(${bob}px) scale(${0.92 + enter * 0.08})` }} /> :
          <div style={{ width: 410, height: 600, borderRadius: "80px 80px 100px 100px", background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`, boxShadow: "0 60px 100px #0008", transform: `translateY(${bob}px) rotate(-5deg)` }}>
            <div style={{ width: 170, height: 50, borderRadius: 25, background: theme.background, margin: "35px auto" }} />
            <div style={{ textAlign: "center", marginTop: 140, color: theme.background, fontSize: 50, fontWeight: 950, letterSpacing: 8 }}>AURA</div>
          </div>}
      </div>
      <div style={{ position: "absolute", bottom: 300, left: 75, right: 75, display: "grid", gap: 18 }}>
        {campaign.reel.featureLabels.map((label, i) => {
          const opacity = featureOpacity(90 + i * 55);
          return <div key={label} style={{ opacity, transform: `translateX(${(1 - opacity) * 70}px)`, border: `2px solid ${theme.text}35`, background: `${theme.background}bb`, borderRadius: 100, padding: "20px 28px", fontSize: 27, fontWeight: 850, letterSpacing: 2, display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ background: theme.accent, color: theme.background, width: 42, height: 42, display: "grid", placeItems: "center", borderRadius: "50%", fontSize: 24 }}>✓</span>{label}
          </div>;
        })}
      </div>
      <div style={{ position: "absolute", bottom: 100, left: 70, right: 70, opacity: interpolate(frame, [270, 295], [0, 1], { extrapolateRight: "clamp" }), transform: `scale(${ctaScale})`, background: theme.accent, color: theme.background, textAlign: "center", padding: "30px 24px", borderRadius: 24, fontSize: 27, fontWeight: 950, letterSpacing: 2, boxShadow: `0 20px 60px ${theme.accent}33` }}>
        {campaign.reel.cta}
      </div>
    </AbsoluteFill>
  );
}