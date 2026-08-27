import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, CheckCircle2, Timer } from "lucide-react";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { PrimaryButton, Row, StatusBadge } from "@/components/apna/ui";
import { rupees } from "@/lib/apna-data";
import { useElapsed, useJobStore } from "@/lib/job-store";
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

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Complete Work — Apna Gig Worker" },
      { name: "description", content: "Review the task checklist, duration and after-work photos before requesting completion." },
      { property: "og:title", content: "Complete Work — Apna Gig Worker" },
      { property: "og:description", content: "Review tasks, duration and photos before requesting completion." },
    ],
  }),
  component: CompleteWork,
});

function CompleteWork() {
  const { job, state, update } = useJobStore();
  const navigate = useNavigate();
  const elapsed = useElapsed(state.startedAt);
  const [tasks, setTasks] = useState<string[]>(state.completedTasks);
  const [notes, setNotes] = useState(state.completionNotes);
  const [photos, setPhotos] = useState(0);
  const [confirm, setConfirm] = useState(false);

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="No active job" backTo="/jobs" />
        <ScreenBody>
          <Card>Nothing to complete.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  const all = [...job.tasks, ...(state.extraWork?.status === "approved" ? [state.extraWork.description] : [])];
  const toggle = (t: string) =>
    setTasks((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const total = job.earnings + (state.extraWork?.status === "approved" ? state.extraWork.amount : 0);

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Complete Work" subtitle={job.id} backTo="/active" right={<StatusBadge status={state.status} />} />
      <ScreenBody>
        <Card className="bg-gradient-sky">
          <p className="text-xs text-muted-foreground">Total work duration</p>
          <p className="mt-1 inline-flex items-center gap-2 font-mono text-3xl font-extrabold text-foreground">
            <Timer className="size-6 text-brand" />
            {elapsed}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {job.service} • {job.customer}
          </p>
        </Card>

        <SectionTitle title="Completed task checklist" />
        <div className="space-y-2">
          {all.map((t) => (
            <button
              key={t}
              onClick={() => toggle(t)}
              className="flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3.5 text-left shadow-card"
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-md border-2 ${
                  tasks.includes(t) ? "border-success bg-success text-success-foreground" : "border-border"
                }`}
              >
                {tasks.includes(t) ? <CheckCircle2 className="size-3.5" /> : null}
              </span>
              <span className="text-xs font-semibold text-foreground">{t}</span>
            </button>
          ))}
        </div>

        <SectionTitle title="After-work photos (optional)" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: photos }).map((_, i) => (
            <div key={i} className="grid aspect-square place-items-center rounded-2xl bg-gradient-sky shadow-card">
              <Camera className="size-5 text-brand" />
            </div>
          ))}
          <button
            onClick={() => setPhotos((p) => Math.min(6, p + 1))}
            className="grid aspect-square place-items-center rounded-2xl border border-dashed border-brand/40 bg-card text-brand"
          >
            <Camera className="size-5" />
          </button>
        </div>

        <SectionTitle title="Completion notes" />
        <Card>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything the customer should know — parts replaced, warranty, follow-up."
            className="w-full resize-none rounded-2xl bg-surface p-3 text-xs text-foreground outline-none placeholder:text-muted-foreground"
          />
        </Card>

        <SectionTitle title="Payment summary" />
        <Card>
          <Row label="Base job" value={rupees(job.earnings)} />
          {state.extraWork?.status === "approved" ? (
            <Row label="Additional work" value={rupees(state.extraWork.amount)} />
          ) : null}
          <Row label="Total payable" value={rupees(total)} />
        </Card>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Please review the work with the customer before requesting completion.
        </p>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton disabled={tasks.length === 0} onClick={() => setConfirm(true)}>
          Request Job Completion
        </PrimaryButton>
      </StickyFooter>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent className="max-w-[340px] rounded-3xl">
          <AlertDialogTitle>Request completion?</AlertDialogTitle>
          <AlertDialogDescription>
            The customer will receive a 4-digit end OTP to verify {tasks.length} completed task
            {tasks.length > 1 ? "s" : ""}.
          </AlertDialogDescription>
          <AlertDialogHeader />
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Review again</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-2xl"
              onClick={() => {
                update({ status: "completion_pending", completedTasks: tasks, completionNotes: notes });
                navigate({ to: "/end-otp" });
              }}
            >
              Request completion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PhoneScreen>
  );
}
