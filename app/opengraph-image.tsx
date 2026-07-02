import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Archer Advisory — Legal Accounting & Compliance for Law Firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "linear-gradient(145deg, #090914 0%, #12122e 55%, #0b1828 100%)",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Architectural grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "72px 72px",
          }}
        />
        {/* Blue accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "600px",
            height: "420px",
            background:
              "radial-gradient(ellipse at 85% 15%, rgba(16,12,158,0.28) 0%, transparent 65%)",
          }}
        />
        {/* Orange rule at top-left */}
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: "72px",
            width: "36px",
            height: "2px",
            background: "#CF432B",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Archer Advisory
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.07,
              letterSpacing: "-0.02em",
              maxWidth: 840,
              marginBottom: 22,
            }}
          >
            Legal Accounting &amp; Compliance for Law Firms
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.55,
              maxWidth: 620,
            }}
          >
            Trust accounting · AML compliance · Legal billing · Financial management
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
