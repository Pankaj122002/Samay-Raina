import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const runtime = "edge";

export const alt = "Samay Raina | India's Got Latent — Season 2";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#f5f5f5",
            marginBottom: "16px",
          }}
        >
          Samay <span style={{ color: "#F5C518" }}>Raina</span>
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#a0a0a0",
          }}
        >
          India&apos;s Got Latent — Season 2
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "20px",
            color: "#666",
          }}
        >
          Apply to perform, or register for the live audience
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
