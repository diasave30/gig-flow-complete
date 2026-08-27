import { Link } from "@tanstack/react-router";
import { MapPin, Navigation, Clock, IndianRupee, Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STATUS_LABEL, rupees, type Job, type JobStatus } from "@/lib/apna-data";

/* ---------- Buttons ---------- */

const base =
  "inline-flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-[18px]";

export function PrimaryButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, "bg-gradient-brand text-brand-foreground shadow-card", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, "border border-border bg-card text-foreground", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, "bg-destructive/10 text-destructive border border-destructive/25", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------- Badges ---------- */

const tone: Record<string, string> = {
  brand: "bg-brand/12 text-brand",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
  warning: "bg-warning/25 text-warning-foreground",
  muted: "bg-muted text-muted-foreground",
  danger: "bg-destructive/12 text-destructive",
};

export function Chip({
  children,
  variant = "muted",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof tone;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
        tone[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusTone: Record<JobStatus, keyof typeof tone> = {
  new: "accent",
  accepted: "brand",
  en_route: "brand",
  arrived: "warning",
  start_pending: "warning",
  active: "success",
  completion_pending: "warning",
  completed: "success",
  rejected: "danger",
};

export function StatusBadge({
  status,
  className,
}: {
  status: JobStatus;
  className?: string | undefined;
}) {
  return (
    <Chip variant={statusTone[status]} className={className}>
      <span className="size-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </Chip>
  );
}

/* ---------- Filter chips ---------- */

export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors",
            o === value
              ? "bg-gradient-brand text-brand-foreground shadow-card"
              : "bg-card text-muted-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---------- Job card ---------- */

export function JobCard({ job, status }: { job: Job; status?: JobStatus }) {
  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      className="block rounded-3xl bg-card p-4 shadow-card"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-foreground">{job.service}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {job.customer} • {job.area}
          </p>
        </div>
        <StatusBadge status={status ?? "new"} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5 text-brand" /> {job.distanceKm} km away
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5 text-brand" /> {job.when}
        </span>
        <span className="inline-flex items-center gap-1">
          <Navigation className="size-3.5 text-brand" /> {job.durationMins} min
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
        <span className="inline-flex items-center text-[15px] font-extrabold text-foreground">
          <IndianRupee className="size-4" />
          {job.earnings.toLocaleString("en-IN")}
        </span>
        <span className="rounded-xl bg-gradient-brand px-4 py-2 text-xs font-bold text-brand-foreground">
          View Job
        </span>
      </div>
    </Link>
  );
}

/* ---------- Summary rows ---------- */

export function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="text-right text-xs font-bold text-foreground">{value}</span>
    </div>
  );
}

export function EarningsPill({ amount, note }: { amount: number; note?: string }) {
  return (
    <div className="rounded-2xl bg-success/12 px-4 py-3">
      <p className="text-[11px] font-semibold text-success">Estimated earnings</p>
      <p className="text-xl font-extrabold text-foreground">{rupees(amount)}</p>
      {note ? <p className="text-[11px] text-muted-foreground">{note}</p> : null}
    </div>
  );
}

/* ---------- Map placeholder ---------- */

export function MapPreview({ height = 180, label }: { height?: number; label?: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-sky shadow-card"
      style={{ height }}
    >
      <svg viewBox="0 0 400 240" className="absolute inset-0 size-full opacity-70">
        <g stroke="oklch(0.85 0.03 240)" strokeWidth="6" fill="none">
          <path d="M-20 60 H420" />
          <path d="M-20 170 H420" />
          <path d="M90 -20 V260" />
          <path d="M280 -20 V260" />
        </g>
        <path
          d="M100 190 C 150 190, 160 120, 210 110 S 280 80, 300 55"
          stroke="oklch(0.62 0.19 254)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="100" cy="190" r="10" fill="oklch(0.62 0.19 254)" />
        <circle cx="300" cy="55" r="10" fill="oklch(0.72 0.17 45)" />
      </svg>
      {label ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1.5 text-[11px] font-bold text-foreground">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/* ---------- Progress steps ---------- */

export function ProgressSteps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div
            className={cn(
              "h-1.5 rounded-full",
              i <= current ? "bg-gradient-brand" : "bg-muted",
            )}
          />
          <span
            className={cn(
              "truncate text-[10px] font-semibold",
              i <= current ? "text-brand" : "text-muted-foreground",
            )}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- OTP input ---------- */

export function OtpInput({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      <input
        inputMode="numeric"
        autoFocus
        maxLength={4}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
        className="absolute inset-0 z-10 size-full opacity-0"
        aria-label="Enter OTP"
      />
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "grid h-16 w-14 place-items-center rounded-2xl bg-card text-2xl font-extrabold text-foreground shadow-card ring-2",
              invalid
                ? "ring-destructive"
                : value.length === i
                  ? "ring-brand"
                  : "ring-transparent",
            )}
          >
            {value[i] ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RatingPill({ rating, jobs }: { rating: number; jobs: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-warning/25 px-2.5 py-1 text-[11px] font-bold text-warning-foreground">
      <Star className="size-3 fill-current" /> {rating} ({jobs})
    </span>
  );
}
