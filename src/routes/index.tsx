import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  CalendarClock,
  MapPinned,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Zap,
  Droplets,
  Sparkles,
  Wrench,
  PaintRoller,
  Hammer,
} from "lucide-react";
import { PhoneScreen, StatusBar, ScreenBody, Card, SectionTitle } from "@/components/apna/shell";
import { Chip, JobCard, RatingPill, StatusBadge } from "@/components/apna/ui";
import { JOBS } from "@/lib/apna-data";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apna Gig Worker — Home Dashboard" },
      {
        name: "description",
        content:
          "Apna Gig worker app: manage availability, service area, local demand and live job requests in one place.",
      },
      { property: "og:title", content: "Apna Gig Worker — Home Dashboard" },
      {
        property: "og:description",
        content: "Manage availability, service area, demand insights and job requests.",
      },
    ],
  }),
  component: Home,
});

const SERVICES = [
  { name: "Plumber", icon: Droplets },
  { name: "Electrician", icon: Zap },
  { name: "Cleaner", icon: Sparkles },
  { name: "Repair", icon: Wrench },
  { name: "Painter", icon: PaintRoller },
  { name: "Mason", icon: Hammer },
];

function Home() {
  const { state, update, job } = useJobStore();
  const liveJob = job && !["new", "rejected", "completed"].includes(state.status) ? job : null;

  const resumeTo =
    state.status === "accepted" || state.status === "en_route"
      ? "/navigate"
      : state.status === "arrived"
        ? "/arrival"
        : state.status === "start_pending"
          ? "/start-otp"
          : state.status === "completion_pending"
            ? "/end-otp"
            : "/active";

  return (
    <PhoneScreen>
      <StatusBar />
      <ScreenBody>
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-sm font-extrabold text-brand-foreground">
              SP
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Namaste</p>
              <p className="truncate text-[15px] font-bold text-foreground">Suresh Patil</p>
            </div>
          </div>
          <button
            className="relative grid size-10 shrink-0 place-items-center rounded-2xl bg-card shadow-card"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
              3
            </span>
          </button>
        </header>

        <div className="mt-1 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
          <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-card px-4 shadow-card">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              placeholder="Search jobs, areas, services..."
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Link
            to="/jobs"
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-card"
            aria-label="Job filters"
          >
            <SlidersHorizontal className="size-5" />
          </Link>
        </div>

        {/* Availability banner */}
        <Card className="mt-4 bg-gradient-sky">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <Chip variant={state.available ? "success" : "muted"}>
                {state.available ? "Available Today" : "Unavailable"}
              </Chip>
              <p className="mt-2 text-lg font-extrabold leading-tight text-foreground">
                {state.available ? `${state.slotFrom} – ${state.slotTo}` : "Not accepting jobs"}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Service radius {state.radiusKm} km • {state.areas.length} areas
              </p>
            </div>
            <button
              onClick={() => update({ available: !state.available })}
              className={`h-8 w-14 shrink-0 rounded-full p-1 transition-colors ${
                state.available ? "bg-gradient-brand" : "bg-muted"
              }`}
              aria-label="Toggle availability"
            >
              <span
                className={`block size-6 rounded-full bg-card transition-transform ${
                  state.available ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </Card>

        {liveJob ? (
          <Link to={resumeTo} className="mt-4 block rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-bold text-foreground">
                Ongoing: {liveJob.service}
              </p>
              <StatusBadge status={state.status} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {liveJob.customer} • {liveJob.area} • Tap to continue
            </p>
          </Link>
        ) : null}

        {/* Quick tiles */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/availability" className="rounded-3xl bg-card p-4 shadow-card">
            <CalendarClock className="size-6 text-brand" />
            <p className="mt-3 text-sm font-bold text-foreground">Availability</p>
            <p className="text-[11px] text-muted-foreground">Days & time slots</p>
          </Link>
          <Link to="/service-area" className="rounded-3xl bg-card p-4 shadow-card">
            <MapPinned className="size-6 text-brand" />
            <p className="mt-3 text-sm font-bold text-foreground">Service Area</p>
            <p className="text-[11px] text-muted-foreground">{state.radiusKm} km radius</p>
          </Link>
          <Link to="/demand" className="rounded-3xl bg-card p-4 shadow-card">
            <TrendingUp className="size-6 text-accent" />
            <p className="mt-3 text-sm font-bold text-foreground">Demand</p>
            <p className="text-[11px] text-muted-foreground">42 jobs nearby</p>
          </Link>
          <Link to="/jobs" className="rounded-3xl bg-card p-4 shadow-card">
            <Briefcase className="size-6 text-accent" />
            <p className="mt-3 text-sm font-bold text-foreground">Job Requests</p>
            <p className="text-[11px] text-muted-foreground">{JOBS.length} new requests</p>
          </Link>
        </div>

        <SectionTitle title="Most Booked Services" />
        <div className="grid grid-cols-4 gap-3">
          {SERVICES.map((s) => (
            <Link to="/jobs" key={s.name} className="flex flex-col items-center gap-1.5">
              <span className="grid size-14 place-items-center rounded-2xl bg-card shadow-card">
                <s.icon className="size-6 text-brand" />
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground">{s.name}</span>
            </Link>
          ))}
        </div>

        <SectionTitle title="Popular Near You" />
        <div className="space-y-3">
          {JOBS.slice(0, 2).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>

        <Card className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <ShieldCheck className="size-5 shrink-0 text-success" />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-foreground">
                Cooperative Member • Verified
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Apna Gig ID: AG-PUN-10482
              </p>
            </div>
          </div>
          <RatingPill rating={4.8} jobs={132} />
        </Card>
      </ScreenBody>
    </PhoneScreen>
  );
}
