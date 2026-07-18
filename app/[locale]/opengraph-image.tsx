import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const title = `${siteConfig.name} - Máy Phun Cát & Khắc Bia Mộ Đá Granite`;

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
          background: "#2A2118",
          color: "#ffffff",
          fontSize: 48,
          fontWeight: 700,
          textAlign: "center",
          padding: 48,
        }}
      >
        <div style={{ fontSize: 32, color: "#A67C3D", marginBottom: 24 }}>
          {siteConfig.domain}
        </div>
        {title}
      </div>
    ),
    { ...size },
  );
}
