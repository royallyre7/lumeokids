"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";

export default function DownloadResultsButton() {
  const [busy, setBusy] = useState(false);
  const params = useParams();
  const childId = params.id as string;

  const handleClick = useCallback(async () => {
    setBusy(true);

    try {
      const res = await fetch(
        `/api/children/${childId}/assessment/pdf`,
        { method: "POST" }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${childId}-assessment-results.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err: any) {
      console.error("[PDF] Download failed:", err);
      window.alert("PDF download failed: " + (err.message || err));
    } finally {
      setBusy(false);
    }
  }, [childId]);

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="inline-flex items-center justify-center font-bold transition-all duration-200 bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sm hover:from-sky-600 hover:to-sky-700 px-6 py-2.5 text-sm rounded-full gap-2 disabled:opacity-40 disabled:pointer-events-none active:scale-95"
    >
      {busy ? "⏳ Generating PDF..." : "📄 Download PDF"}
    </button>
  );
}
