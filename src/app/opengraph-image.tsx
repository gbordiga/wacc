import { ImageResponse } from "next/og";

export const alt = "WACC Calculator | wacc.less.style";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
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
              width: 80,
              height: 80,
              background: "#5135E8",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ fontWeight: 700, fontSize: 48 }}>wacc</span>
            <span style={{ color: "#5135E8", fontWeight: 700, fontSize: 48 }}>
              .less
            </span>
            <span style={{ fontWeight: 300, fontSize: 48 }}>.style</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 120,
            marginBottom: 40,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 800,
              margin: 0,
              marginBottom: 12,
              display: "block",
            }}
          >
            <span style={{ color: "#5135E8" }}>WACC</span> Calculator
          </h1>
          <p
            style={{
              fontSize: 32,
              margin: 0,
              color: "#666",
              display: "block",
            }}
          >
            Calculate the Weighted Average Cost of Capital
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            color: "#666",
            display: "block",
          }}
        >
          Created by Giacomo Bordiga
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
