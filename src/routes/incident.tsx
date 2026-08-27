import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Video, Square, Play, ShieldAlert, PhoneCall, Siren, Lock } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, DangerButton, PrimaryButton, SecondaryButton } from "@/components/apna/ui";
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

export const Route = createFileRoute("/incident")({
  head: () => ({
    meta: [
      { title: "Report Incident — Apna Gig Worker" },
      { name: "description", content: "Record and securely submit an incident report with cooperative safety support." },
      { property: "og:title", content: "Report Incident — Apna Gig Worker" },
      { property: "og:description", content: "Record and submit an incident with safety support." },
    ],
  }),
  component: Incident,
});

function Incident() {
  const { update } = useJobStore();
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [details, setDetails] = useState("");
  const [confirm, setConfirm] = useState(false);

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Report an Incident" subtitle="You are supported" backTo="/active" />
      <ScreenBody>
        <Card className="flex items-start gap-3 bg-gradient-sky">
          <ShieldAlert className="size-5 shrink-0 text-brand" />
          <p className="text-[11px] text-muted-foreground">
            Use this if you face unsafe, abusive or unfair behaviour. Take your time — a
            cooperative coordinator reviews every report within 30 minutes.
          </p>
        </Card>

        <SectionTitle title="Record incident video" />
        <Card>
          <div className="grid h-44 place-items-center rounded-2xl bg-foreground/90">
            {recording ? (
              <div className="text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-destructive/25">
                  <span className="size-4 animate-pulse rounded-full bg-destructive" />
                </span>
                <p className="mt-2 text-xs font-bold text-background">Recording… 00:12</p>
              </div>
            ) : recorded ? (
              <div className="text-center">
                <Play className="mx-auto size-8 text-background" />
                <p className="mt-2 text-xs font-bold text-background">incident-clip.mp4 • 00:12</p>
              </div>
            ) : (
              <div className="text-center">
                <Video className="mx-auto size-8 text-background/70" />
                <p className="mt-2 text-xs text-background/70">Camera preview</p>
              </div>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {recording ? (
              <DangerButton
                onClick={() => {
                  setRecording(false);
                  setRecorded(true);
                }}
              >
                <Square /> Stop
              </DangerButton>
            ) : (
              <SecondaryButton
                onClick={() => {
                  setRecording(true);
                  setRecorded(false);
                }}
              >
                <Video /> Record
              </SecondaryButton>
            )}
            <SecondaryButton
              disabled={!recorded}
              onClick={() => toast("Playing recorded clip preview")}
            >
              <Play /> Preview
            </SecondaryButton>
          </div>
        </Card>

        <SectionTitle title="What happened?" />
        <Card>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            placeholder="Describe the incident in your words. Include time and what was said or done."
            className="w-full resize-none rounded-2xl bg-surface p-3 text-xs text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="mt-3 flex items-start gap-2">
            <Lock className="size-4 shrink-0 text-success" />
            <p className="text-[11px] text-muted-foreground">
              Evidence is end-to-end encrypted and stored securely. It is never shared with the
              customer.
            </p>
          </div>
        </Card>

        <SectionTitle title="Immediate help" />
        <div className="grid grid-cols-2 gap-3">
          <SecondaryButton onClick={() => toast("Connecting to cooperative support…")}>
            <PhoneCall /> Support
          </SecondaryButton>
          <DangerButton onClick={() => toast.error("SOS alert sent with your live location")}>
            <Siren /> Emergency SOS
          </DangerButton>
        </div>
        <Chip variant="muted" className="mt-3">
          Emergency connects to the Apna Gig SOS module
        </Chip>
      </ScreenBody>

      <StickyFooter>
        <PrimaryButton disabled={!details && !recorded} onClick={() => setConfirm(true)}>
          Submit Incident
        </PrimaryButton>
      </StickyFooter>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent className="max-w-[340px] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Submit this incident report?</AlertDialogTitle>
            <AlertDialogDescription>
              Your recording and notes will be sent to the cooperative safety desk. You will get a
              callback shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Review again</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-2xl"
              onClick={() => {
                update({ incidentSubmitted: true });
                toast.success("Incident submitted • Reference INC-2291");
                navigate({ to: "/active" });
              }}
            >
              Submit securely
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PhoneScreen>
  );
}
