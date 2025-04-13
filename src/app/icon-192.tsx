import { ImageResponse } from "next/og";

export const contentType = "image/png";

export const size = {
  width: 192,
  height: 192,
};

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: "#5135E8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "38px",
          fontWeight: 800,
        }}
      >
        W
      </div>
    ),
    {
      ...size,
    }
  );
}
