import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  MapPin,
  Clock,
  Phone,
  ShieldAlert,
  Info,
  User,
  Timer,
  Flag,
} from "lucide-react";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, DangerButton, EarningsPill, MapPreview, PrimaryButton, Row, StatusBadge } from "@/components/apna/ui";
import { JOBS, rupees } from "@/lib/apna-data";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/jobs/$jobId")({
  head: () => ({
    meta: [
      { title: "Job Details — Apna Gig Worker" },
      { name: "description", content: "Full job details: customer, location, service scope, earnings and safety guidance." },
      { property: "og:title", content: "Job Details — Apna Gig Worker" },
      { property: "og:description", content: "Customer, location, service scope, earnings and safety guidance." },
    ],
  }),
  component: JobDetails,
});

function JobDetails() {
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const navigate = useNavigate();
  const { state, update } = useJobStore();
  const job = JOBS.find((j) => j.id === jobId);

  useEffect(() => {
    if (job && state.activeJobId !== job.id && ["new", "rejected", "completed"].includes(state.status)) {
      update({ activeJobId: job.id, status: "new" });
    }
  }, [job, state.activeJobId, state.status, update]);

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="Job not found" backTo="/jobs" />
        <ScreenBody>
          <Card>This job request is no longer available.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  const go = (decision: "accept" | "reject") => {
    update({ activeJobId: job.id });
    navigate({ to: "/decision", search: { decision } });
  };

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title={job.service} subtitle={`Request ${job.id}`} backTo="/jobs" />
      <ScreenBody>
        <Card className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-sky">
              <User className="size-5 text-brand" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">{job.customer}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                Verified customer • Contact unlocks on accept
              </p>
            </div>
          </div>
          <StatusBadge status={state.activeJobId === job.id ? state.status : "new"} />
        </Card>

        <SectionTitle title="Location" />
        <MapPreview height={160} label={`${job.distanceKm} km • ~${Math.round(job.distanceKm * 4)} min ride`} />
        <Card className="mt-3">
          <Row label="Area" value={`${job.area}, ${job.city.split(",")[0]}`} icon={<MapPin className="size-3.5 text-brand" />} />
          <Row label="Address" value={job.address} />
          <Row label="Distance" value={`${job.distanceKm} km from you`} />
        </Card>

        <SectionTitle title="Service details" />
        <Card>
          <Row label="Service" value={job.service} />
          <Row label="Scheduled" value={job.when} icon={<Clock className="size-3.5 text-brand" />} />
          <Row label="Estimated duration" value={`${job.durationMins} minutes`} icon={<Timer className="size-3.5 text-brand" />} />
          <p className="mt-2 border-t border-border/70 pt-3 text-xs leading-relaxed text-muted-foreground">
            {job.description}
          </p>
          <div className="mt-3 rounded-2xl bg-surface p-3">
            <p className="text-[11px] font-bold text-foreground">Customer instructions</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{job.instructions}</p>
          </div>
        </Card>

        <SectionTitle title="Earnings" />
        <EarningsPill amount={job.earnings} note={job.payment} />
        <Card className="mt-3">
          <Row label="Job value" value={rupees(Math.round(job.earnings * 1.15))} />
          <Row label="Platform fee" value={`- ${rupees(Math.round(job.earnings * 0.15))}`} />
          <Row label="You receive" value={rupees(job.earnings)} />
        </Card>

        <SectionTitle title="Safety information" />
        <Card className="space-y-3">
          <div className="flex items-start gap-2">
            <ShieldAlert className="size-4 shrink-0 text-success" />
            <p className="text-[11px] text-muted-foreground">
              Always start work only after verifying the customer OTP. Carry your Apna Gig ID.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Info className="size-4 shrink-0 text-brand" />
            <p className="text-[11px] text-muted-foreground">
              Payments must be completed through Apna Gig. Do not accept off-platform work.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-[11px] font-bold text-destructive">
            <Flag className="size-3.5" /> Report a concern about this request
          </button>
        </Card>

        <Card className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">Need clarity before accepting?</span>
          <Chip variant="brand">
            <Phone className="size-3" /> Call support
          </Chip>
        </Card>
      </ScreenBody>
      <StickyFooter>
        <DangerButton onClick={() => go("reject")}>Reject</DangerButton>
        <PrimaryButton onClick={() => go("accept")}>Accept Job</PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
