import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Clock, IndianRupee, Send, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { Chip, PrimaryButton, Row, SecondaryButton } from "@/components/apna/ui";
import { rupees } from "@/lib/apna-data";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/additional-work")({
  head: () => ({
    meta: [
      { title: "Additional Work Request — Apna Gig Worker" },
      { name: "description", content: "Document extra work requested by the customer and send it for approval." },
      { property: "og:title", content: "Additional Work Request — Apna Gig Worker" },
      { property: "og:description", content: "Document extra work and send it for customer approval." },
    ],
  }),
  component: AdditionalWork,
});

function AdditionalWork() {
  const { state, update } = useJobStore();
  const navigate = useNavigate();
  const existing = state.extraWork;
  const [desc, setDesc] = useState(existing?.description ?? "");
  const [mins, setMins] = useState(existing?.minutes ?? 30);
  const [amount, setAmount] = useState(existing?.amount ?? 350);
  const [photo, setPhoto] = useState(false);
  const status = existing?.status ?? "draft";

  const send = () => {
    update({ extraWork: { description: desc, minutes: mins, amount, status: "pending" } });
    toast.success("Sent to customer for approval");
    setTimeout(() => {
      update({ extraWork: { description: desc, minutes: mins, amount, status: "approved" } });
      toast.success("Customer approved the additional work");
    }, 2500);
  };

  const tone =
    status === "approved" ? "success" : status === "pending" ? "warning" : status === "rejected" ? "danger" : "muted";

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Additional Work" subtitle="Customer request" backTo="/active" />
      <ScreenBody>
        <Card className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">Request status</span>
          <Chip variant={tone as never}>
            {status === "approved" ? (
              <CheckCircle2 className="size-3" />
            ) : status === "rejected" ? (
              <XCircle className="size-3" />
            ) : null}
            {status === "draft"
              ? "Draft"
              : status === "pending"
                ? "Pending Approval"
                : status === "approved"
                  ? "Approved"
                  : "Rejected"}
          </Chip>
        </Card>

        <SectionTitle title="Work description" />
        <Card>
          <textarea
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="e.g. Customer requested rewiring of the balcony light point and a new switchboard."
            className="w-full resize-none rounded-2xl bg-surface p-3 text-xs text-foreground outline-none placeholder:text-muted-foreground"
          />
        </Card>

        <SectionTitle title="Estimate" />
        <Card>
          <Row label="Additional time" value={`${mins} minutes`} icon={<Clock className="size-3.5 text-brand" />} />
          <input
            type="range"
            min={15}
            max={180}
            step={15}
            value={mins}
            onChange={(e) => setMins(Number(e.target.value))}
            className="w-full accent-[var(--brand)]"
          />
          <Row label="Additional earnings" value={rupees(amount)} icon={<IndianRupee className="size-3.5 text-brand" />} />
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-[var(--brand)]"
          />
        </Card>

        <SectionTitle title="Supporting photo (optional)" />
        <button
          onClick={() => setPhoto((p) => !p)}
          className="flex w-full items-center gap-3 rounded-3xl bg-card p-4 text-left shadow-card"
        >
          <span className="grid size-11 place-items-center rounded-2xl bg-brand/12">
            <Camera className="size-5 text-brand" />
          </span>
          <div>
            <p className="text-xs font-bold text-foreground">
              {photo ? "extra-work-1.jpg attached" : "Attach a photo of the extra work"}
            </p>
            <p className="text-[11px] text-muted-foreground">Helps the customer approve faster</p>
          </div>
        </button>

        <Card className="mt-4">
          <p className="text-[11px] text-muted-foreground">
            Once approved, the additional task and amount are added to this job automatically.
          </p>
        </Card>
      </ScreenBody>
      <StickyFooter>
        <SecondaryButton
          onClick={() => {
            update({ extraWork: null });
            navigate({ to: "/active" });
          }}
        >
          Cancel Request
        </SecondaryButton>
        <PrimaryButton disabled={!desc} onClick={send}>
          <Send /> Send for Approval
        </PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
