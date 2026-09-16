import { ImageResponse } from "next/og";

export const alt = "Geo Mukkath — AI-Native Product Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle, #d9d9d9 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#1a5fb4",
            display: "flex",
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "2px solid #1a5fb4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              color: "#1a5fb4",
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            toolsy.online
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              color: "#1a1a2e",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -2,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Geo Mukkath
          </div>

          {/* Divider */}
          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: "#1a5fb4",
              marginBottom: 24,
              display: "flex",
            }}
          />

          {/* Role */}
          <div
            style={{
              display: "flex",
              color: "#1a5fb4",
              fontSize: 40,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            AI-Native Product Manager
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              color: "#4a4a5a",
              fontSize: 26,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            User empathy + AI fluency → everyday tools
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#1a5fb4",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
