import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ShieldAlert,
  PlusCircle,
  Phone,
  FileText,
  LifeBuoy,
  Timer,
} from "lucide-react";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, PrimaryButton, Row, StatusBadge } from "@/components/apna/ui";
import { useElapsed, useJobStore } from "@/lib/job-store";
import { rupees } from "@/lib/apna-data";
import { toast } from "sonner";

export const Route = createFileRoute("/active")({
  head: () => ({
    meta: [
      { title: "Active Job — Apna Gig Worker" },
      { name: "description", content: "Live job workspace with timer, task list, evidence, incident reporting and completion." },
      { property: "og:title", content: "Active Job — Apna Gig Worker" },
      { property: "og:description", content: "Live job workspace with timer, tasks and safety actions." },
    ],
  }),
  component: ActiveJob,
});

function ActiveJob() {
  const { job, state } = useJobStore();
  const navigate = useNavigate();
  const elapsed = useElapsed(state.startedAt);

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="No active job" backTo="/jobs" />
        <ScreenBody>
          <Card>Start a job to open the workspace.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  const actions = [
    { label: "Contact Customer", icon: Phone, onClick: () => toast("Calling via masked number…") },
    { label: "Job Details", icon: FileText, onClick: () => navigate({ to: "/jobs/$jobId", params: { jobId: job.id } }) },
    { label: "Add Evidence", icon: Camera, onClick: () => navigate({ to: "/evidence" }) },
    { label: "Report Incident", icon: ShieldAlert, onClick: () => navigate({ to: "/incident" }) },
    { label: "Additional Work", icon: PlusCircle, onClick: () => navigate({ to: "/additional-work" }) },
    { label: "Safety Support", icon: LifeBuoy, onClick: () => toast("Cooperative safety desk notified.") },
  ];

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Active Job" subtitle={job.id} backTo="/" right={<StatusBadge status={state.status} />} />
      <ScreenBody>
        <Card className="bg-gradient-brand text-brand-foreground">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/20 px-2.5 py-1 text-[11px] font-bold">
              <span className="size-1.5 animate-pulse rounded-full bg-current" /> Work in progress
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold opacity-90">
              <Timer className="size-3.5" /> Started{" "}
              {state.startedAt
                ? new Date(state.startedAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—"}
            </span>
          </div>
          <p className="mt-4 font-mono text-4xl font-extrabold tracking-tight">{elapsed}</p>
          <p className="mt-1 text-xs opacity-90">
            {job.service} • Estimated {job.durationMins} min
          </p>
        </Card>

        <SectionTitle title="Job information" />
        <Card>
          <Row label="Customer" value={job.customer} />
          <Row label="Address" value={job.address} />
          <Row label="Earnings" value={rupees(job.earnings + (state.extraWork?.status === "approved" ? state.extraWork.amount : 0))} />
        </Card>

        <SectionTitle title="Task instructions" />
        <Card className="space-y-2">
          {job.tasks.map((t) => (
            <div key={t} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
              <p className="text-xs text-muted-foreground">{t}</p>
            </div>
          ))}
          {state.extraWork?.status === "approved" ? (
            <div className="flex items-start gap-2 border-t border-border/70 pt-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
              <p className="text-xs text-foreground">
                <span className="font-bold">Additional: </span>
                {state.extraWork.description}
              </p>
            </div>
          ) : null}
        </Card>

        <SectionTitle title="Quick actions" />
        <div className="grid grid-cols-3 gap-3">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={a.onClick}
              className="flex flex-col items-center gap-2 rounded-3xl bg-card p-3 text-center shadow-card"
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-brand/12">
                <a.icon className="size-5 text-brand" />
              </span>
              <span className="text-[10px] font-bold leading-tight text-foreground">{a.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip variant={state.evidence.length ? "success" : "muted"}>
            {state.evidence.length} evidence files
          </Chip>
          <Chip variant={state.extraWork ? "warning" : "muted"}>
            Extra work: {state.extraWork ? state.extraWork.status : "none"}
          </Chip>
          <Chip variant={state.incidentSubmitted ? "danger" : "muted"}>
            {state.incidentSubmitted ? "Incident reported" : "No incidents"}
          </Chip>
        </div>

        <Link to="/incident" className="mt-4 block">
          <Card className="flex items-center gap-3 bg-destructive/8">
            <ShieldAlert className="size-5 shrink-0 text-destructive" />
            <p className="text-[11px] text-muted-foreground">
              Feeling unsafe? Record an incident or reach the cooperative safety desk instantly.
            </p>
          </Card>
        </Link>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton onClick={() => navigate({ to: "/complete" })}>Complete Work</PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
