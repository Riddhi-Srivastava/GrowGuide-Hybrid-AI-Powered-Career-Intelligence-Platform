import { useState, useEffect } from "react";
import type { AnalysisResult } from "@/lib/analysisEngine";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  query: { role: string; skills: string[]; hoursPerDay: number; targetWeeks: number };
  result: AnalysisResult;
}

const STORAGE_KEY = "growguide_history";

export function useAnalysisHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {}
  }, []);

  const addEntry = (query: HistoryEntry["query"], result: AnalysisResult) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      query,
      result,
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return entry;
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addEntry, clearHistory };
}
