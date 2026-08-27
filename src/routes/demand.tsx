import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownRight, MapPin, TrendingUp } from "lucide-react";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, PrimaryButton } from "@/components/apna/ui";
import { DEMAND, MONTHLY_DEMAND } from "@/lib/apna-data";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/demand")({
  head: () => ({
    meta: [
      { title: "Demand Insights — Apna Gig Worker" },
      { name: "description", content: "See nearby demand, high-demand services and seasonal trends around your service area." },
      { property: "og:title", content: "Demand Insights — Apna Gig Worker" },
      { property: "og:description", content: "Nearby demand, high-demand services and seasonal trends." },
    ],
  }),
  component: Demand,
});

function Demand() {
  const { state } = useJobStore();
  const navigate = useNavigate();
  const max = Math.max(...MONTHLY_DEMAND.map((m) => m.value));

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Demand Insights" subtitle="Work opportunities near you" backTo="/" />
      <ScreenBody>
        <Card className="bg-gradient-sky">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-4 text-brand" /> Kothrud • {state.radiusKm} km radius
          </div>
          <p className="mt-2 text-3xl font-extrabold text-foreground">130 jobs</p>
          <p className="text-xs text-muted-foreground">
            Posted around you in the last 7 days • 42 open right now
          </p>
          <div className="mt-3 flex gap-2">
            <Chip variant="success">
              <ArrowUpRight className="size-3" /> 18% vs last week
            </Chip>
            <Chip variant="brand">3 areas active</Chip>
          </div>
        </Card>

        <SectionTitle title="High-demand services" />
        <div className="space-y-3">
          {DEMAND.map((d) => (
            <button
              key={d.name}
              onClick={() => navigate({ to: "/jobs", search: { category: d.name } })}
              className="w-full rounded-3xl bg-card p-4 text-left shadow-card"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{d.name}</p>
                  <p className="text-[11px] text-muted-foreground">{d.jobs} open jobs nearby</p>
                </div>
                <Chip variant={d.trend >= 0 ? "success" : "danger"}>
                  {d.trend >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(d.trend)}%
                </Chip>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-brand"
                  style={{ width: `${Math.min(100, (d.jobs / 42) * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] font-bold text-muted-foreground">{d.level} demand</p>
            </button>
          ))}
        </div>

        <SectionTitle title="Monthly demand trend" />
        <Card>
          <div className="flex h-36 items-end justify-between gap-3">
            {MONTHLY_DEMAND.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground">{m.value}</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-brand"
                  style={{ height: `${(m.value / max) * 100}%` }}
                />
                <span className="text-[10px] font-semibold text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <SectionTitle title="Seasonal opportunity" />
        <Card className="flex items-start gap-3">
          <TrendingUp className="size-5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-bold text-foreground">Monsoon repair season</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Waterproofing, wiring safety checks and appliance servicing usually rise 25–30% in
              Pune during August–September. Keep evening slots open.
            </p>
          </div>
        </Card>
      </ScreenBody>
      <StickyFooter>
        <Link to="/jobs" className="w-full">
          <PrimaryButton>View Nearby Jobs</PrimaryButton>
        </Link>
      </StickyFooter>
    </PhoneScreen>
  );
}
