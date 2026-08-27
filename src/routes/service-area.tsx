import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Plus, Trash2, LocateFixed } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, MapPreview, PrimaryButton } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: "Service Area — Apna Gig Worker" },
      { name: "description", content: "Choose the areas and travel radius where you accept work on Apna Gig." },
      { property: "og:title", content: "Service Area — Apna Gig Worker" },
      { property: "og:description", content: "Choose areas and travel radius where you accept work." },
    ],
  }),
  component: ServiceArea,
});

const SUGGESTIONS = ["Hadapsar, Pune", "Wakad, Pune", "Aundh, Pune", "Hinjawadi, Pune"];

function ServiceArea() {
  const { state, update } = useJobStore();
  const navigate = useNavigate();
  const [radius, setRadius] = useState(state.radiusKm);
  const [areas, setAreas] = useState(state.areas);

  const save = () => {
    update({ radiusKm: radius, areas });
    toast.success("Service area updated");
    navigate({ to: "/" });
  };

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Service Area" subtitle="Where you want to work" backTo="/" />
      <ScreenBody>
        <MapPreview height={200} label={`${radius} km radius • Kothrud, Pune`} />

        <Card className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <LocateFixed className="size-5 shrink-0 text-brand" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Current location</p>
              <p className="truncate text-sm font-bold text-foreground">Kothrud, Pune 411038</p>
            </div>
          </div>
          <Chip variant="success">Live</Chip>
        </Card>

        <SectionTitle title="Service radius" />
        <Card>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Travel up to</span>
            <span className="text-xl font-extrabold text-foreground">{radius} km</span>
          </div>
          <input
            type="range"
            min={2}
            max={25}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--brand)]"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>2 km</span>
            <span>25 km</span>
          </div>
        </Card>

        <SectionTitle title="Saved service areas" />
        <div className="space-y-3">
          {areas.map((a) => (
            <Card key={a} className="flex items-center justify-between gap-3">
              <span className="inline-flex min-w-0 items-center gap-2">
                <MapPin className="size-4 shrink-0 text-brand" />
                <span className="truncate text-sm font-semibold text-foreground">{a}</span>
              </span>
              <button
                onClick={() => setAreas((p) => p.filter((x) => x !== a))}
                className="grid size-8 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive"
                aria-label={`Remove ${a}`}
              >
                <Trash2 className="size-4" />
              </button>
            </Card>
          ))}
        </div>

        <SectionTitle title="Add new area" />
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.filter((s) => !areas.includes(s)).map((s) => (
            <button
              key={s}
              onClick={() => setAreas((p) => [...p, s])}
              className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-2 text-[11px] font-bold text-brand shadow-card"
            >
              <Plus className="size-3.5" /> {s}
            </button>
          ))}
        </div>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton onClick={save}>Save Changes</PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
