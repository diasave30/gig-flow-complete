import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Plus, X, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, PrimaryButton, SecondaryButton } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/availability")({
  head: () => ({
    meta: [
      { title: "Availability Calendar — Apna Gig Worker" },
      { name: "description", content: "Set your working days, time slots and unavailable dates on Apna Gig." },
      { property: "og:title", content: "Availability Calendar — Apna Gig Worker" },
      { property: "og:description", content: "Set working days, time slots and unavailable dates." },
    ],
  }),
  component: Availability,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = Array.from({ length: 28 }, (_, i) => i + 1);

function Availability() {
  const { state, update } = useJobStore();
  const navigate = useNavigate();
  const [days, setDays] = useState<string[]>(state.availableDays);
  const [slots, setSlots] = useState([{ from: state.slotFrom, to: state.slotTo }]);
  const [unavailable, setUnavailable] = useState<number[]>([14, 15]);

  const toggleDay = (d: string) =>
    setDays((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  const save = () => {
    update({
      availableDays: days,
      slotFrom: slots[0]?.from ?? "9:00 AM",
      slotTo: slots[slots.length - 1]?.to ?? "7:00 PM",
      available: days.length > 0,
    });
    toast.success("Availability saved");
    navigate({ to: "/" });
  };

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Availability" subtitle="Manage when you can work" backTo="/" />
      <ScreenBody>
        <Card className="bg-gradient-sky">
          <Chip variant={days.length ? "success" : "muted"}>
            {days.length ? "Available Today" : "Marked Unavailable"}
          </Chip>
          <p className="mt-2 text-xl font-extrabold text-foreground">
            {slots[0]?.from} – {slots[slots.length - 1]?.to}
          </p>
          <p className="text-xs text-muted-foreground">
            {days.length} working days • {slots.length} time slot{slots.length > 1 ? "s" : ""}
          </p>
        </Card>

        <SectionTitle title="Working days" />
        <div className="flex gap-2">
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => toggleDay(d)}
              className={`h-11 flex-1 rounded-2xl text-[11px] font-bold transition-colors ${
                days.includes(d)
                  ? "bg-gradient-brand text-brand-foreground shadow-card"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <SectionTitle title="August 2026" />
        <Card>
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {DAYS.map((d) => (
              <span key={d} className="text-[10px] font-bold text-muted-foreground">
                {d[0]}
              </span>
            ))}
            {DATES.map((d) => {
              const off = unavailable.includes(d);
              return (
                <button
                  key={d}
                  onClick={() =>
                    setUnavailable((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]))
                  }
                  className={`grid aspect-square place-items-center rounded-xl text-xs font-semibold ${
                    off
                      ? "bg-destructive/12 text-destructive line-through"
                      : d === 27
                        ? "bg-gradient-brand text-brand-foreground"
                        : "bg-surface text-foreground"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Tap a date to mark it unavailable. Highlighted date is today.
          </p>
        </Card>

        <SectionTitle title="Time slots" />
        <div className="space-y-3">
          {slots.map((s, i) => (
            <Card key={i} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground">
                <Clock className="size-4 text-brand" />
                {s.from} – {s.to}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setSlots((p) =>
                      p.map((x, idx) => (idx === i ? { ...x, to: x.to === "7:00 PM" ? "9:00 PM" : "7:00 PM" } : x)),
                    )
                  }
                  className="rounded-xl bg-surface px-3 py-1.5 text-[11px] font-bold text-brand"
                >
                  Edit
                </button>
                {slots.length > 1 ? (
                  <button
                    onClick={() => setSlots((p) => p.filter((_, idx) => idx !== i))}
                    className="grid size-8 place-items-center rounded-xl bg-destructive/10 text-destructive"
                    aria-label="Remove slot"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
              </div>
            </Card>
          ))}
        </div>

        <button
          onClick={() => setSlots((p) => [...p, { from: "8:00 PM", to: "10:00 PM" }])}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-brand/40 bg-card py-3 text-xs font-bold text-brand"
        >
          <Plus className="size-4" /> Add time slot
        </button>

        <SecondaryButton
          className="mt-3"
          onClick={() => {
            setDays([]);
            toast("Marked unavailable for the selected period");
          }}
        >
          <CalendarCheck /> Mark unavailable
        </SecondaryButton>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton onClick={save}>Save Availability</PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
