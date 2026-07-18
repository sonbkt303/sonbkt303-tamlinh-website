import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tam Linh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const title = "Tam Linh - Khắc Bia Mộ & Máy Bắn Cát";

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
          background: "#a38a5d",
          color: "#ffffff",
          fontSize: 56,
          fontWeight: 700,
          textAlign: "center",
          padding: 48,
        }}
      >
        <div style={{ fontSize: 36, color: "#f7d749", marginBottom: 24 }}>
          tamlinh.com
        </div>
        {title}
      </div>
    ),
    { ...size },
  );
}
