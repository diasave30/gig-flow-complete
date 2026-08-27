import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin, Clock, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { DangerButton, EarningsPill, PrimaryButton, Row, SecondaryButton } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Search = { decision?: "accept" | "reject" | undefined };

export const Route = createFileRoute("/decision")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    decision: s["decision"] === "reject" ? "reject" : "accept",
  }),
  head: () => ({
    meta: [
      { title: "Accept or Reject Job — Apna Gig Worker" },
      { name: "description", content: "Confirm the job summary before accepting, or choose a reason to decline." },
      { property: "og:title", content: "Accept or Reject Job — Apna Gig Worker" },
      { property: "og:description", content: "Confirm the job before accepting, or decline with a reason." },
    ],
  }),
  component: Decision,
});

const REASONS = ["Too far", "Timing conflict", "Currently unavailable", "Service mismatch", "Other"];

function Decision() {
  const { decision } = Route.useSearch();
  const { job, update } = useJobStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"accept" | "reject">(decision ?? "accept");
  const [reason, setReason] = useState(REASONS[0]);
  const [confirm, setConfirm] = useState(false);

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="No job selected" backTo="/jobs" />
        <ScreenBody>
          <Card>Pick a job request first.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  const accept = () => {
    update({ status: "accepted", evidence: [], extraWork: null, incidentSubmitted: false, completedTasks: [] });
    toast.success("Job accepted");
    navigate({ to: "/navigate" });
  };

  const reject = () => {
    update({ status: "rejected", activeJobId: null });
    toast(`Request declined • ${reason}`);
    navigate({ to: "/jobs" });
  };

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title={mode === "accept" ? "Confirm Job" : "Decline Job"} subtitle={job.id} />
      <ScreenBody>
        <div className="flex gap-2 rounded-2xl bg-card p-1.5 shadow-card">
          {(["accept", "reject"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`h-10 flex-1 rounded-xl text-xs font-bold ${
                mode === m ? "bg-gradient-brand text-brand-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "accept" ? "Accept Job" : "Reject Job"}
            </button>
          ))}
        </div>

        <SectionTitle title="Job summary" />
        <Card>
          <Row label="Service" value={job.service} />
          <Row label="Location" value={`${job.area}, ${job.city.split(",")[0]}`} icon={<MapPin className="size-3.5 text-brand" />} />
          <Row label="Scheduled" value={job.when} icon={<Clock className="size-3.5 text-brand" />} />
          <Row label="Distance" value={`${job.distanceKm} km`} />
          <Row label="Earnings" value={`₹${job.earnings}`} icon={<IndianRupee className="size-3.5 text-brand" />} />
        </Card>

        {mode === "accept" ? (
          <>
            <div className="mt-4">
              <EarningsPill amount={job.earnings} note="Paid after end OTP verification" />
            </div>
            <Card className="mt-3 flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-success" />
              <p className="text-[11px] text-muted-foreground">
                By accepting, you commit to reaching {job.area} before {job.when.split(", ")[1]}.
                Repeated cancellations affect your cooperative rating.
              </p>
            </Card>
          </>
        ) : (
          <>
            <SectionTitle title="Reason for declining" />
            <div className="space-y-2">
              {REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`flex w-full items-center justify-between rounded-2xl bg-card px-4 py-3.5 text-left text-sm font-semibold shadow-card ${
                    reason === r ? "ring-2 ring-brand" : ""
                  }`}
                >
                  <span className="text-foreground">{r}</span>
                  <span
                    className={`size-4 rounded-full border-2 ${
                      reason === r ? "border-brand bg-brand" : "border-border"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Declining is free. The request will be offered to other nearby workers.
            </p>
          </>
        )}
      </ScreenBody>

      <StickyFooter>
        {mode === "accept" ? (
          <PrimaryButton onClick={() => setConfirm(true)}>Confirm &amp; Accept Job</PrimaryButton>
        ) : (
          <>
            <SecondaryButton onClick={() => setMode("accept")}>Cancel</SecondaryButton>
            <DangerButton onClick={reject}>Confirm Reject</DangerButton>
          </>
        )}
      </StickyFooter>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent className="max-w-[340px] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Accept this job?</AlertDialogTitle>
            <AlertDialogDescription>
              {job.service} at {job.area} • {job.when}. You will be navigated to the customer
              location.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Not now</AlertDialogCancel>
            <AlertDialogAction className="rounded-2xl" onClick={accept}>
              Yes, accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PhoneScreen>
  );
}
