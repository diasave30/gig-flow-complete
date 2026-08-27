import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, Video, Upload, Trash2, Lock, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { PhoneScreen, StatusBar, TopBar, ScreenBody, Card, StickyFooter, SectionTitle } from "@/components/apna/shell";
import { PrimaryButton, SecondaryButton, Chip } from "@/components/apna/ui";
import { useJobStore } from "@/lib/job-store";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Before-Work Evidence — Apna Gig Worker" },
      { name: "description", content: "Optionally capture consented before-work photos or video for job protection." },
      { property: "og:title", content: "Before-Work Evidence — Apna Gig Worker" },
      { property: "og:description", content: "Capture consented before-work photos or video." },
    ],
  }),
  component: Evidence,
});

function Evidence() {
  const { state, update } = useJobStore();
  const navigate = useNavigate();
  const items = state.evidence.filter((e) => e.phase === "before");

  const add = (kind: "photo" | "video") =>
    update({
      evidence: [
        ...state.evidence,
        {
          id: `${Date.now()}`,
          kind,
          label: `${kind === "photo" ? "Photo" : "Video"} ${items.length + 1} • Work area`,
          phase: "before",
        },
      ],
    });

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar title="Before-Work Evidence" subtitle="Optional" backTo="/active" />
      <ScreenBody>
        <Card className="flex items-start gap-3 bg-gradient-sky">
          <Lock className="size-5 shrink-0 text-brand" />
          <div>
            <p className="text-xs font-bold text-foreground">Privacy & consent</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Evidence is optional. Always ask the customer before capturing. Avoid faces, children
              and personal documents. Files are encrypted and visible only to the cooperative
              during a dispute.
            </p>
          </div>
        </Card>

        <SectionTitle title="Capture" />
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Photo", icon: Camera, fn: () => add("photo") },
            { label: "Video", icon: Video, fn: () => add("video") },
            { label: "Upload", icon: Upload, fn: () => add("photo") },
          ].map((a) => (
            <button
              key={a.label}
              onClick={a.fn}
              className="flex flex-col items-center gap-2 rounded-3xl bg-card p-4 shadow-card"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-brand/12">
                <a.icon className="size-5 text-brand" />
              </span>
              <span className="text-[11px] font-bold text-foreground">{a.label}</span>
            </button>
          ))}
        </div>

        <SectionTitle title={`Evidence added (${items.length})`} />
        {items.length === 0 ? (
          <Card className="py-8 text-center">
            <ImageIcon className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-2 text-xs font-bold text-foreground">No evidence added</p>
            <p className="text-[11px] text-muted-foreground">You can skip this step anytime.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((e) => (
              <Card key={e.id} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-sky">
                    {e.kind === "photo" ? (
                      <Camera className="size-5 text-brand" />
                    ) : (
                      <Video className="size-5 text-brand" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-foreground">{e.label}</p>
                    <Chip variant="success" className="mt-1">
                      Consent confirmed
                    </Chip>
                  </div>
                </div>
                <button
                  onClick={() => update({ evidence: state.evidence.filter((x) => x.id !== e.id) })}
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive"
                  aria-label="Remove evidence"
                >
                  <Trash2 className="size-4" />
                </button>
              </Card>
            ))}
          </div>
        )}
      </ScreenBody>
      <StickyFooter>
        <SecondaryButton onClick={() => navigate({ to: "/active" })}>Skip for now</SecondaryButton>
        <PrimaryButton
          onClick={() => {
            toast.success("Evidence saved securely");
            navigate({ to: "/active" });
          }}
        >
          Save Evidence
        </PrimaryButton>
      </StickyFooter>
    </PhoneScreen>
  );
}
