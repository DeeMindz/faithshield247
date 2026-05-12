/* generateCanvasPDF.ts
 * Generates a print-ready Business Model Canvas PDF
 * Uses a hidden iframe with styled HTML, then triggers window.print()
 */

interface BMCSectionData {
  id: string;
  title: string;
  summary: string[];
  details: { heading: string; items: string[] }[];
  insight?: string;
}

interface StageData {
  stage: string;
  title: string;
  items: string[];
}

// Color mapping for PDF (using hex since oklch isn't universally supported in print)
const sectionColors: Record<string, { accent: string; bg: string }> = {
  partners:      { accent: "#6B4ECC", bg: "#F0ECFA" },
  activities:    { accent: "#6B4ECC", bg: "#F0ECFA" },
  resources:     { accent: "#6B4ECC", bg: "#F0ECFA" },
  value:         { accent: "#2E8B57", bg: "#ECF5F0" },
  relationships: { accent: "#2E8B57", bg: "#ECF5F0" },
  channels:      { accent: "#2E8B57", bg: "#ECF5F0" },
  segments:      { accent: "#C75B2A", bg: "#FDF0EB" },
  costs:         { accent: "#3B5998", bg: "#EBF0F7" },
  revenue:       { accent: "#3B5998", bg: "#EBF0F7" },
};

const stageColors = ["#B8860B", "#2E8B57", "#6B4ECC"];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildSectionHTML(section: BMCSectionData): string {
  const colors = sectionColors[section.id] || { accent: "#333", bg: "#f5f5f5" };

  const detailsHTML = section.details
    .map(
      (group) => `
      <div class="detail-group">
        <h4 style="color: ${colors.accent};">
          <span class="dot" style="background: ${colors.accent};"></span>
          ${escapeHtml(group.heading)}
        </h4>
        <ul>
          ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");

  const insightHTML = section.insight
    ? `<div class="insight">
        <span class="insight-icon">&#x1F4A1;</span>
        <p><em>${escapeHtml(section.insight)}</em></p>
      </div>`
    : "";

  return `
    <div class="bmc-section" style="border-left: 4px solid ${colors.accent};">
      <div class="section-header" style="background: ${colors.bg};">
        <h3>${escapeHtml(section.title)}</h3>
      </div>
      <div class="section-body">
        <div class="summary">
          ${section.summary.map((s) => `<span class="summary-tag" style="background: ${colors.bg}; color: ${colors.accent};">${escapeHtml(s)}</span>`).join("")}
        </div>
        ${detailsHTML}
        ${insightHTML}
      </div>
    </div>`;
}

function buildRoadmapHTML(stages: StageData[]): string {
  return `
    <div class="roadmap">
      <h2 class="roadmap-title">Strategic Execution Roadmap</h2>
      <p class="roadmap-subtitle">Sell trust first, build tech in stages</p>
      <div class="stages">
        ${stages
          .map(
            (s, i) => `
          <div class="stage" style="border-top: 3px solid ${stageColors[i]};">
            <div class="stage-label" style="color: ${stageColors[i]};">${escapeHtml(s.stage)}</div>
            <div class="stage-title">${escapeHtml(s.title)}</div>
            <ul>
              ${s.items.map((item) => `<li style="color: ${stageColors[i]};">
                <span style="color: #333;">${escapeHtml(item)}</span>
              </li>`).join("")}
            </ul>
          </div>`
          )
          .join('<div class="stage-arrow">&#x2192;</div>')}
      </div>
      <div class="roadmap-advice">
        <p><em>"Your strongest early model is probably not 'build app first.' It is more likely: sell trust first, build tech in stages. That is the sober route. Not glamorous, but solid."</em></p>
      </div>
    </div>`;
}

function buildSnapshotHTML(sections: BMCSectionData[]): string {
  const snapshotData = [
    { label: "Customer Segments", id: "segments" },
    { label: "Value Propositions", id: "value" },
    { label: "Channels", id: "channels" },
    { label: "Customer Relationships", id: "relationships" },
    { label: "Revenue Streams", id: "revenue" },
    { label: "Key Resources", id: "resources" },
    { label: "Key Activities", id: "activities" },
    { label: "Key Partnerships", id: "partners" },
    { label: "Cost Structure", id: "costs" },
  ];

  return `
    <div class="snapshot">
      <h2 class="snapshot-title">One-Page Business Model Snapshot</h2>
      <table class="snapshot-table">
        <tbody>
          ${snapshotData
            .map((row) => {
              const sec = sections.find((s) => s.id === row.id);
              const colors = sectionColors[row.id] || { accent: "#333", bg: "#f5f5f5" };
              return `<tr>
                <td class="snapshot-label" style="border-left: 3px solid ${colors.accent}; background: ${colors.bg};">${escapeHtml(row.label)}</td>
                <td class="snapshot-value">${sec ? sec.summary.join(" &middot; ") : ""}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
}

export function generateCanvasPDF(
  sections: BMCSectionData[],
  stages: StageData[]
): void {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // BMC grid order: Partners, Activities, Value, Relationships, Segments (row 1-2), Resources, Channels (row 2), Costs, Revenue (row 3)
  const gridOrder = [
    { ids: ["partners", "activities", "value", "relationships", "segments"], label: "Top Row" },
    { ids: ["resources", "channels"], label: "Middle Row (continued)" },
    { ids: ["costs", "revenue"], label: "Bottom Row" },
  ];

  const allSectionsHTML = sections.map((s) => buildSectionHTML(s)).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FaithShield247 — Business Model Canvas</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1a1a2e;
      background: #fff;
      line-height: 1.6;
      font-size: 11px;
    }

    @page {
      size: A4;
      margin: 18mm 15mm 18mm 15mm;
    }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }

    /* ─── Cover ─── */
    .cover {
      text-align: center;
      padding: 80px 40px 60px;
      border-bottom: 3px solid #B8860B;
      margin-bottom: 30px;
    }
    .cover-shield {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #1a1a2e, #2d2d5e);
      border-radius: 12px;
      margin-bottom: 20px;
      position: relative;
    }
    .cover-shield::after {
      content: "\\2720";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 28px;
      color: #B8860B;
    }
    .cover h1 {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .cover .subtitle {
      font-size: 14px;
      color: #666;
      margin-bottom: 6px;
    }
    .cover .tagline {
      font-family: 'Playfair Display', serif;
      font-size: 13px;
      font-style: italic;
      color: #B8860B;
      margin-bottom: 24px;
    }
    .cover .meta {
      font-size: 10px;
      color: #999;
    }

    /* ─── Section headers ─── */
    .page-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 4px;
      padding-bottom: 8px;
      border-bottom: 2px solid #eee;
    }
    .page-subtitle {
      font-size: 11px;
      color: #888;
      margin-bottom: 20px;
    }

    /* ─── BMC Sections ─── */
    .bmc-section {
      margin-bottom: 18px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #e8e8e8;
      page-break-inside: avoid;
    }
    .section-header {
      padding: 10px 14px;
    }
    .section-header h3 {
      font-family: 'Playfair Display', serif;
      font-size: 14px;
      font-weight: 600;
    }
    .section-body {
      padding: 12px 14px;
    }
    .summary {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 12px;
    }
    .summary-tag {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 600;
    }
    .detail-group {
      margin-bottom: 10px;
    }
    .detail-group h4 {
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
    .detail-group ul {
      list-style: none;
      padding-left: 12px;
    }
    .detail-group li {
      font-size: 10px;
      color: #444;
      padding: 1px 0;
      position: relative;
      padding-left: 12px;
    }
    .detail-group li::before {
      content: "\\2713";
      position: absolute;
      left: 0;
      color: #2E8B57;
      font-size: 9px;
    }
    .insight {
      margin-top: 10px;
      padding: 8px 12px;
      background: #FFFBF0;
      border-left: 3px solid #B8860B;
      border-radius: 4px;
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .insight-icon { font-size: 12px; flex-shrink: 0; }
    .insight p {
      font-family: 'Playfair Display', serif;
      font-size: 10px;
      color: #333;
      line-height: 1.5;
    }

    /* ─── Roadmap ─── */
    .roadmap {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      page-break-inside: avoid;
    }
    .roadmap-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 2px;
    }
    .roadmap-subtitle {
      font-size: 10px;
      color: #888;
      margin-bottom: 16px;
    }
    .stages {
      display: flex;
      gap: 12px;
      align-items: stretch;
    }
    .stage {
      flex: 1;
      padding: 12px;
      background: #fafafa;
      border-radius: 6px;
    }
    .stage-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 2px;
    }
    .stage-title {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .stage ul {
      list-style: none;
      padding: 0;
    }
    .stage li {
      font-size: 10px;
      padding: 2px 0;
      padding-left: 14px;
      position: relative;
    }
    .stage li::before {
      content: "\\2192";
      position: absolute;
      left: 0;
      font-size: 10px;
    }
    .stage-arrow {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #ccc;
    }
    .roadmap-advice {
      margin-top: 14px;
      padding: 10px 14px;
      background: #FFFBF0;
      border-left: 3px solid #B8860B;
      border-radius: 4px;
    }
    .roadmap-advice p {
      font-family: 'Playfair Display', serif;
      font-size: 10px;
      color: #333;
      line-height: 1.5;
    }

    /* ─── Snapshot ─── */
    .snapshot {
      margin-top: 20px;
      page-break-inside: avoid;
    }
    .snapshot-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 12px;
    }
    .snapshot-table {
      width: 100%;
      border-collapse: collapse;
    }
    .snapshot-table td {
      padding: 8px 12px;
      border: 1px solid #e8e8e8;
      font-size: 10px;
      vertical-align: top;
    }
    .snapshot-label {
      font-weight: 700;
      width: 160px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .snapshot-value {
      color: #444;
      line-height: 1.5;
    }

    /* ─── Footer ─── */
    .footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 2px solid #B8860B;
      text-align: center;
    }
    .footer p {
      font-family: 'Playfair Display', serif;
      font-size: 11px;
      font-style: italic;
      color: #666;
    }
    .footer .ref {
      font-size: 9px;
      color: #999;
      margin-top: 2px;
    }
  </style>
</head>
<body>
  <!-- Cover -->
  <div class="cover">
    <div class="cover-shield"></div>
    <h1>FaithShield247</h1>
    <p class="subtitle">Business Model Canvas</p>
    <p class="tagline">A Christian digital safeguarding and moral-formation platform for children, young people, parents, churches, and Christian schools</p>
    <p class="meta">Generated ${escapeHtml(today)} &middot; Confidential</p>
  </div>

  <!-- Full Canvas Detail -->
  <div class="page-title">Business Model Canvas — Detailed View</div>
  <p class="page-subtitle">All nine building blocks with strategic insights</p>

  ${allSectionsHTML}

  <!-- Roadmap -->
  ${buildRoadmapHTML(stages)}

  <!-- Snapshot -->
  <div class="page-break"></div>
  ${buildSnapshotHTML(sections)}

  <!-- Footer -->
  <div class="footer">
    <p>"Train up a child in the way he should go; even when he is old he will not depart from it."</p>
    <p class="ref">— Proverbs 22:6</p>
  </div>
</body>
</html>`;

  // Open in a new window and trigger print
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Please allow pop-ups to download the PDF.");
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for fonts to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 600);
  };

  // Fallback if onload doesn't fire
  setTimeout(() => {
    try {
      printWindow.print();
    } catch {
      // Already printed or window closed
    }
  }, 2000);
}
