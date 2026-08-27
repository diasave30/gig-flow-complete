import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navigation, Phone, AlertTriangle, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, MapPreview, PrimaryButton, Row, SecondaryButton, StatusBadge } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/navigate")({
  head: () => ({
    meta: [
      { title: "Navigate to Customer — Apna Gig Worker" },
      { name: "description", content: "Route, distance remaining and arrival time for your accepted Apna Gig job." },
      { property: "og:title", content: "Navigate to Customer — Apna Gig Worker" },
      { property: "og:description", content: "Route, distance remaining and estimated arrival time." },
    ],
  }),
  component: NavigateScreen,
});

function NavigateScreen() {
  const { job, state, update } = useJobStore();
  const navigate = useNavigate();

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="No active job" backTo="/jobs" />
        <ScreenBody>
          <Card>Accept a job to start navigation.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar
        title="Navigate to Customer"
        subtitle={job.id}
        backTo="/"
        right={<StatusBadge status={state.status === "accepted" ? "accepted" : state.status} />}
      />
      <ScreenBody>
        <MapPreview height={280} label="Live route • Kothrud → Paud Road" />

        <Card className="mt-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-extrabold text-foreground">{job.distanceKm} km</p>
              <p className="text-[10px] text-muted-foreground">Remaining</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">{Math.round(job.distanceKm * 4)} min</p>
              <p className="text-[10px] text-muted-foreground">ETA</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground">
                {job.when.split(", ")[1]}
              </p>
              <p className="text-[10px] text-muted-foreground">Slot</p>
            </div>
          </div>
        </Card>

        <SectionTitle title="Destination" />
        <Card>
          <Row label="Customer" value={job.customer} />
          <Row label="Address" value={job.address} icon={<MapPin className="size-3.5 text-brand" />} />
          <Row label="Landmark" value={`${job.area}, ${job.city}`} />
          <Row label="Scheduled" value={job.when} icon={<Clock className="size-3.5 text-brand" />} />
        </Card>

        <SectionTitle title="On the way" />
        <div className="grid grid-cols-2 gap-3">
          <SecondaryButton
            onClick={() => {
              update({ status: "en_route" });
              toast.success("Navigation started");
            }}
          >
            <Navigation /> Start Nav
          </SecondaryButton>
          <SecondaryButton onClick={() => toast("Calling customer via masked number…")}>
            <Phone /> Call
          </SecondaryButton>
        </div>
        <SecondaryButton
          className="mt-3"
          onClick={() => toast("Support notified. A coordinator will call you.")}
        >
          <AlertTriangle /> Report a problem
        </SecondaryButton>

        <Card className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[11px] text-muted-foreground">
            Going back keeps this job accepted.
          </span>
          <Chip variant="brand">Job saved</Chip>
        </Card>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton
          onClick={() => {
            update({ status: "arrived" });
            navigate({ to: "/arrival" });
          }}
        >
          I Have Arrived
        </PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
