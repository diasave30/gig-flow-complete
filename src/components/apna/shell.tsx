import { useRouter } from "@tanstack/react-router";
import { ChevronLeft, Wifi, BatteryMedium, SignalHigh } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneScreen({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-surface-2 flex justify-center">
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-surface shadow-card">
        {children}
      </div>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold text-foreground/80">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalHigh className="size-4" />
        <Wifi className="size-4" />
        <BatteryMedium className="size-4" />
      </div>
    </div>
  );
}

export function TopBar({
  title,
  subtitle,
  backTo,
  right,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  right?: ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
      <button
        onClick={() => (backTo ? router.navigate({ to: backTo } as never) : router.history.back())}
        className="grid size-10 shrink-0 place-items-center rounded-2xl bg-card shadow-card text-foreground"
        aria-label="Go back"
      >
        <ChevronLeft className="size-5" />
      </button>
      <div className="min-w-0">
        <h1 className="truncate text-[17px] font-bold leading-tight text-foreground">{title}</h1>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

export function ScreenBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-5 pb-6 no-scrollbar", className)}>{children}</div>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 flex gap-3 border-t border-border/60 bg-card/95 px-5 pb-6 pt-4 backdrop-blur shadow-float">
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-3xl bg-card p-4 shadow-card", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mt-6 mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-bold text-foreground">{title}</h2>
      {action ? (
        <button onClick={onAction} className="text-xs font-semibold text-brand">
          {action}
        </button>
      ) : null}
    </div>
  );
}
