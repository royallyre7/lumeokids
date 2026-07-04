"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ErrorLog {
  id: string;
  level: string;
  message: string;
  source: string;
  url: string;
  userId: string | null;
  stack: string | null;
  metadata: string | null;
  createdAt: string;
}

export default function ErrorLogsPage() {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  async function fetchLogs() {
    setLoading(true);
    try {
      const url = filter
        ? `/api/error-logs?level=${filter}&limit=100`
        : "/api/error-logs?limit=100";
      const res = await fetch(url);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch {
      console.error("Failed to fetch error logs");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getLevelColor(level: string) {
    switch (level) {
      case "error": return "bg-red-100 text-red-700";
      case "warn": return "bg-yellow-100 text-yellow-700";
      case "info": return "bg-blue-100 text-blue-700";
      default: return "bg-stone-100 text-stone-600";
    }
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-800">📋 Error Logs</h1>
          <p className="text-sm text-stone-500">Debug and troubleshooting logs</p>
        </div>
        <Button onClick={fetchLogs} variant="secondary" loading={loading}>
          🔄 Refresh
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["", "error", "warn", "info"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === level
                ? "bg-gradient-to-r from-coral-500 to-lavender-500 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {level || "All"}
          </button>
        ))}
      </div>

      {/* Logs */}
      {loading ? (
        <div className="text-center py-12 text-stone-400">Loading...</div>
      ) : logs.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-stone-500">No error logs found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <Card key={log.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getLevelColor(log.level)}`}>
                  {log.level.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 break-words">
                    {log.message}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-stone-400">
                    <span>📦 {log.source}</span>
                    <span>🕐 {formatDate(log.createdAt)}</span>
                    {log.url && <span>🔗 {log.url}</span>}
                  </div>
                  {log.metadata && (
                    <pre className="mt-2 p-2 bg-stone-50 rounded text-xs text-stone-600 overflow-x-auto">
                      {JSON.stringify(JSON.parse(log.metadata), null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
