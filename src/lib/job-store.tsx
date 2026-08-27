import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { JOBS, type Job, type JobStatus } from "./apna-data";

export type EvidenceItem = { id: string; kind: "photo" | "video"; label: string; phase: "before" | "after" };

export type ExtraWork = {
  description: string;
  minutes: number;
  amount: number;
  status: "draft" | "pending" | "approved" | "rejected";
};

type WorkerState = {
  available: boolean;
  availableDays: string[];
  slotFrom: string;
  slotTo: string;
  radiusKm: number;
  areas: string[];
  activeJobId: string | null;
  status: JobStatus;
  startedAt: number | null;
  evidence: EvidenceItem[];
  extraWork: ExtraWork | null;
  incidentSubmitted: boolean;
  completedTasks: string[];
  completionNotes: string;
};

const DEFAULT: WorkerState = {
  available: true,
  availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  slotFrom: "9:00 AM",
  slotTo: "7:00 PM",
  radiusKm: 8,
  areas: ["Kothrud, Pune", "Baner, Pune", "Viman Nagar, Pune"],
  activeJobId: null,
  status: "new",
  startedAt: null,
  evidence: [],
  extraWork: null,
  incidentSubmitted: false,
  completedTasks: [],
  completionNotes: "",
};

type Ctx = {
  state: WorkerState;
  update: (patch: Partial<WorkerState>) => void;
  reset: () => void;
  job: Job | null;
  jobById: (id: string) => Job | undefined;
};

const JobCtx = createContext<Ctx | null>(null);
const KEY = "apnagig.worker.v1";

export function JobStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkerState>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...DEFAULT, ...(JSON.parse(raw) as WorkerState) });
    } catch {
      /* ignore */
    }
  }, []);

  const update = useCallback((patch: Partial<WorkerState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      state,
      update,
      reset,
      job: JOBS.find((j) => j.id === state.activeJobId) ?? null,
      jobById: (id: string) => JOBS.find((j) => j.id === id),
    }),
    [state, update, reset],
  );

  return <JobCtx.Provider value={value}>{children}</JobCtx.Provider>;
}

export function useJobStore() {
  const ctx = useContext(JobCtx);
  if (!ctx) throw new Error("useJobStore must be used inside JobStoreProvider");
  return ctx;
}

export function useElapsed(startedAt: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!startedAt) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [startedAt]);
  if (!startedAt) return "00:00:00";
  const s = Math.max(0, Math.floor((now - startedAt) / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}
