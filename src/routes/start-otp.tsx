import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter } from "@/components/apna/shell";
import { Chip, OtpInput, PrimaryButton, ProgressSteps, Row, SecondaryButton } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/start-otp")({
  head: () => ({
    meta: [
      { title: "Start Work OTP — Apna Gig Worker" },
      { name: "description", content: "Verify the customer's 4-digit start OTP to officially begin the job." },
      { property: "og:title", content: "Start Work OTP — Apna Gig Worker" },
      { property: "og:description", content: "Verify the customer's start OTP to begin the job." },
    ],
  }),
  component: StartOtp,
});

export const DEMO_START_OTP = "4821";

function StartOtp() {
  const { job, update } = useJobStore();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "error">("idle");

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

  const verify = () => {
    setStatus("verifying");
    setTimeout(() => {
      if (otp === DEMO_START_OTP) {
        update({ status: "active", startedAt: Date.now() });
        toast.success("OTP verified • Work started");
        navigate({ to: "/active" });
      } else {
        setStatus("error");
        toast.error("Invalid OTP. Please re-check with the customer.");
      }
    }, 900);
  };

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Start Work OTP" subtitle={job.id} backTo="/arrival" />
      <ScreenBody>
        <Card>
          <ProgressSteps steps={["Arrive", "Verify OTP", "Start Work"]} current={1} />
        </Card>

        <Card className="mt-4">
          <Row label="Customer" value={job.customer} />
          <Row label="Service" value={job.service} />
          <Row label="Address" value={job.address} />
        </Card>

        <div className="mt-8 text-center">
          <span className="grid mx-auto size-14 place-items-center rounded-3xl bg-brand/12">
            <ShieldCheck className="size-7 text-brand" />
          </span>
          <h2 className="mt-4 text-lg font-extrabold text-foreground">Enter the start OTP</h2>
          <p className="mx-auto mt-1 max-w-[280px] text-xs text-muted-foreground">
            Ask {job.customer.split(" ")[0]} for the 4-digit OTP sent on their Apna Gig app.
          </p>
        </div>

        <div className="mt-6">
          <OtpInput
            value={otp}
            onChange={(v) => {
              setOtp(v);
              setStatus("idle");
            }}
            invalid={status === "error"}
          />
        </div>

        <div className="mt-4 flex justify-center">
          {status === "verifying" ? (
            <Chip variant="brand">
              <Loader2 className="size-3 animate-spin" /> Verifying OTP…
            </Chip>
          ) : status === "error" ? (
            <Chip variant="danger">
              <XCircle className="size-3" /> Invalid OTP — try again
            </Chip>
          ) : (
            <Chip variant="muted">Demo OTP: {DEMO_START_OTP}</Chip>
          )}
        </div>

        <SecondaryButton
          className="mt-6"
          onClick={() => toast("Support will call the customer to share the OTP.")}
        >
          <HelpCircle /> OTP not received? Get help
        </SecondaryButton>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton disabled={otp.length < 4 || status === "verifying"} onClick={verify}>
          {status === "verifying" ? "Verifying…" : "Verify & Start Work"}
        </PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
