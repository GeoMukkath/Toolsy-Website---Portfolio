import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Geo Mukkath — AI-Native Product Manager",
    short_name: "Geo Mukkath",
    description:
      "Official website of Geo Mukkath — AI-native product manager building everyday tools people use at work.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a5fb4",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
