import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// File reads are scoped to fixed folders so the bundler only traces those folders.
async function loadFonts() {
  const weights = [500, 700, 800] as const;
  const files = await Promise.all(
    weights.map((w) => readFile(join(process.cwd(), "assets", "fonts", `manrope-${w}.woff`))),
  );
  return weights.map((weight, i) => ({ name: "Manrope", data: files[i], weight, style: "normal" as const }));
}

async function loadLogo() {
  const buf = await readFile(join(process.cwd(), "public", "curki-logo.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

async function loadPortrait(fileName: string) {
  const buf = await readFile(join(process.cwd(), "associates", fileName));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

type OgOptions = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Portrait file name inside /associates, e.g. "oliver.jpeg". */
  portrait?: string;
};

export async function renderOgImage({ eyebrow, title, subtitle, portrait }: OgOptions) {
  const [fonts, logo, portraitSrc] = await Promise.all([
    loadFonts(),
    loadLogo(),
    portrait ? loadPortrait(portrait) : Promise.resolve(undefined),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          padding: 72,
          fontFamily: "Manrope",
          background: "linear-gradient(135deg, #f6f1fc 0%, #f9fafb 55%, #f0f0ff 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 760,
            height: 760,
            display: "flex",
            borderRadius: 9999,
            // Opaque stops: Satori renders transparent radial stops with dark artefacts.
            background: "radial-gradient(circle, #d8ccff 0%, #ebe4fd 40%, #f6f1fc 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -220,
            width: 680,
            height: 680,
            display: "flex",
            borderRadius: 9999,
            background: "radial-gradient(circle, #d3efe9 0%, #e9f5f4 40%, #f6f7fa 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={48} height={40} alt="" />
            <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: "#1c1629" }}>
              Curki<span style={{ color: "#5b36e1" }}>.AI</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: portraitSrc ? 660 : 980 }}>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#5b36e1" }}>
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: title.length > 34 ? 60 : 80,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: -2,
                color: "#1c1629",
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 30, fontWeight: 500, lineHeight: 1.35, color: "#3c3b42" }}>
              {subtitle}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 22, fontWeight: 500, color: "#5e6282" }}>
            Hosted in Australia · Works on top of your existing systems
          </div>
        </div>

        {portraitSrc && (
          <div style={{ display: "flex", alignItems: "center", marginLeft: 40 }}>
            <div
              style={{
                display: "flex",
                width: 372,
                height: 372,
                padding: 12,
                borderRadius: 9999,
                background: "linear-gradient(135deg, #5b36e1, #9b80ff)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portraitSrc} width={348} height={348} alt="" style={{ borderRadius: 9999, objectFit: "cover" }} />
            </div>
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts },
  );
}
