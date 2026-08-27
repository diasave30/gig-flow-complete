import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, HelpCircle, Loader2, XCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, OtpInput, PrimaryButton, ProgressSteps, Row, SecondaryButton } from "@/components/apna/ui";
import { rupees } from "@/lib/apna-data";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/end-otp")({
  head: () => ({
    meta: [
      { title: "End Work OTP — Apna Gig Worker" },
      { name: "description", content: "Verify the customer's end OTP to close the job and release payment." },
      { property: "og:title", content: "End Work OTP — Apna Gig Worker" },
      { property: "og:description", content: "Verify the end OTP to close the job and release payment." },
    ],
  }),
  component: EndOtp,
});

const DEMO_END_OTP = "7390";

function EndOtp() {
  const { job, state, update } = useJobStore();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"waiting" | "verifying" | "verified" | "failed">("waiting");

  if (!job) {
    return (
      <PhoneScreen>
        <StatusBar />
        <TopBar title="No active job" backTo="/jobs" />
        <ScreenBody>
          <Card>Nothing to verify.</Card>
        </ScreenBody>
      </PhoneScreen>
    );
  }

  const total = job.earnings + (state.extraWork?.status === "approved" ? state.extraWork.amount : 0);

  const verify = () => {
    setStatus("verifying");
    setTimeout(() => {
      if (otp === DEMO_END_OTP) {
        setStatus("verified");
        update({ status: "completed" });
        toast.success("Job completed & verified");
        setTimeout(() => navigate({ to: "/" }), 1400);
      } else {
        setStatus("failed");
        toast.error("Verification failed. Please re-check the OTP.");
      }
    }, 900);
  };

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="End Work OTP" subtitle={job.id} backTo="/complete" />
      <ScreenBody>
        <Card>
          <ProgressSteps steps={["Work done", "End OTP", "Payment"]} current={status === "verified" ? 2 : 1} />
        </Card>

        <SectionTitle title="Job summary" />
        <Card>
          <Row label="Service" value={job.service} />
          <Row label="Customer" value={job.customer} />
          <Row label="Tasks completed" value={`${state.completedTasks.length} of ${job.tasks.length}`} />
          <Row label="Amount payable" value={rupees(total)} />
        </Card>

        <div className="mt-8 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-3xl bg-success/15">
            {status === "verified" ? (
              <CheckCircle2 className="size-7 text-success" />
            ) : (
              <ShieldCheck className="size-7 text-success" />
            )}
          </span>
          <h2 className="mt-4 text-lg font-extrabold text-foreground">
            {status === "verified" ? "Verified successfully" : "Enter the end OTP"}
          </h2>
          <p className="mx-auto mt-1 max-w-[290px] text-xs text-muted-foreground">
            {status === "verified"
              ? "Payment is being released to your Apna Gig wallet."
              : `Ask ${job.customer.split(" ")[0]} for the 4-digit completion OTP.`}
          </p>
        </div>

        <div className="mt-6">
          <OtpInput
            value={otp}
            onChange={(v) => {
              setOtp(v);
              setStatus("waiting");
            }}
            invalid={status === "failed"}
          />
        </div>

        <div className="mt-4 flex justify-center">
          {status === "verifying" ? (
            <Chip variant="brand">
              <Loader2 className="size-3 animate-spin" /> Verifying…
            </Chip>
          ) : status === "failed" ? (
            <Chip variant="danger">
              <XCircle className="size-3" /> Verification failed
            </Chip>
          ) : status === "verified" ? (
            <Chip variant="success">
              <CheckCircle2 className="size-3" /> Job completed
            </Chip>
          ) : (
            <Chip variant="muted">Demo OTP: {DEMO_END_OTP}</Chip>
          )}
        </div>

        <SecondaryButton
          className="mt-6"
          onClick={() => toast("A coordinator can authorise completion if the customer is unavailable.")}
        >
          <HelpCircle /> Customer unavailable? Get help
        </SecondaryButton>
      </ScreenBody>
      <StickyFooter>
        <PrimaryButton
          disabled={otp.length < 4 || status === "verifying" || status === "verified"}
          onClick={verify}
        >
          {status === "verifying" ? "Verifying…" : "Verify & Close Job"}
        </PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
