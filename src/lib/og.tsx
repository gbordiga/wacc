import { ImageResponse } from "next/og"

const size = {
  width: 1200,
  height: 630,
}

export function createGuideOgImage({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            padding: "40px 80px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background: "#5135E8",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 40 }}>wacc</span>
            <span style={{ color: "#5135E8", fontWeight: 700, fontSize: 40 }}>
              .less
            </span>
            <span style={{ fontWeight: 300, fontSize: 40 }}>.style</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 32 ? 48 : 64,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#666" }}>{subtitle}</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
