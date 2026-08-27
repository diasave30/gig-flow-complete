import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, MapPin, ShieldCheck, User } from "lucide-react";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { MapPreview, PrimaryButton, ProgressSteps, Row, StatusBadge } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/arrival")({
  head: () => ({
    meta: [
      { title: "Arrival Verification — Apna Gig Worker" },
      { name: "description", content: "Confirm arrival at the customer location before starting verified work." },
      { property: "og:title", content: "Arrival Verification — Apna Gig Worker" },
      { property: "og:description", content: "Confirm arrival before starting verified work." },
    ],
  }),
  component: Arrival,
});

function Arrival() {
  const { job, state, update } = useJobStore();
  const navigate = useNavigate();

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="No active job" backTo="/jobs" />
        <ScreenBody>
          <Card>Accept a job first.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar
        title="Arrival Verification"
        subtitle={job.id}
        backTo="/navigate"
        right={<StatusBadge status={state.status} />}
      />
      <ScreenBody>
        <Card>
          <ProgressSteps steps={["Arrive", "Verify OTP", "Start Work"]} current={0} />
        </Card>

        <SectionTitle title="You have reached" />
        <MapPreview height={150} label="Within 50 m of customer location" />
        <Card className="mt-3">
          <Row label="Customer" value={job.customer} icon={<User className="size-3.5 text-brand" />} />
          <Row label="Address" value={job.address} icon={<MapPin className="size-3.5 text-brand" />} />
          <Row label="Service" value={job.service} />
          <Row label="Slot" value={job.when} />
        </Card>

        <SectionTitle title="Before you start" />
        <Card className="space-y-3">
          {[
            "Introduce yourself and show your Apna Gig virtual ID.",
            "Ask the customer for the 4-digit start OTP.",
            "Confirm the work scope before opening any equipment.",
          ].map((t, i) => (
            <div key={t} className="flex items-start gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/12 text-[11px] font-bold text-brand">
                {i + 1}
              </span>
              <p className="text-xs text-muted-foreground">{t}</p>
            </div>
          ))}
        </Card>

        <Card className="mt-3 flex items-start gap-2">
          <ShieldCheck className="size-4 shrink-0 text-success" />
          <p className="text-[11px] text-muted-foreground">
            Your arrival is time-stamped and shared with the cooperative for your safety.
          </p>
        </Card>

        <Card className="mt-3 flex items-center gap-2">
          <CheckCircle2 className="size-4 text-success" />
          <p className="text-xs font-bold text-foreground">Arrival status: At location</p>
        </Card>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton
          onClick={() => {
            update({ status: "start_pending" });
            navigate({ to: "/start-otp" });
          }}
        >
          Confirm Arrival
        </PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
