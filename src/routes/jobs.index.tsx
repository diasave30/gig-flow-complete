import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PhoneScreen, StatusBar, TopBar, ScreenBody } from "@/components/apna/shell";
import { Chip, FilterChips, JobCard } from "@/components/apna/ui";
import { CATEGORIES, JOBS } from "@/lib/apna-data";

type JobSearch = { category?: string | undefined };

export const Route = createFileRoute("/jobs/")({
  validateSearch: (search: Record<string, unknown>): JobSearch => ({
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Job Requests — Apna Gig Worker" },
      { name: "description", content: "Browse new service job requests near you with distance, timing and estimated earnings." },
      { property: "og:title", content: "Job Requests — Apna Gig Worker" },
      { property: "og:description", content: "New service job requests with distance, timing and earnings." },
    ],
  }),
  component: JobRequests,
});

function matchCategory(jobCat: string, filter: string) {
  if (filter === "All") return true;
  return filter.toLowerCase().includes(jobCat.toLowerCase()) || jobCat.toLowerCase().includes(filter.toLowerCase());
}

function JobRequests() {
  const { category } = Route.useSearch();
  const [cat, setCat] = useState(
    category && CATEGORIES.some((c) => matchCategory(c, category)) ? category : "All",
  );
  const [distance, setDistance] = useState("Any distance");
  const [time, setTime] = useState("Any time");
  const [q, setQ] = useState("");

  const list = JOBS.filter((j) => matchCategory(j.category, cat))
    .filter((j) =>
      distance === "Any distance"
        ? true
        : distance === "Under 5 km"
          ? j.distanceKm < 5
          : j.distanceKm < 10,
    )
    .filter((j) => (time === "Any time" ? true : j.when.startsWith(time)))
    .filter((j) => (q ? (j.service + j.area + j.customer).toLowerCase().includes(q.toLowerCase()) : true));

  const options = ["All", ...CATEGORIES.filter((c) => c !== "All")];

  return (
    <PhoneScreen>
      <StatusBar />
      <TopBar
        title="Job Requests"
        subtitle={`${list.length} requests near you`}
        backTo="/demand"
        right={<Chip variant="accent">Live</Chip>}
      />
      <ScreenBody>
        <div className="flex items-center gap-2 rounded-2xl bg-card px-4 shadow-card">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search service or area"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <SlidersHorizontal className="size-4 shrink-0 text-brand" />
        </div>

        <div className="mt-3 space-y-2">
          <FilterChips options={options} value={cat} onChange={setCat} />
          <FilterChips
            options={["Any distance", "Under 5 km", "Under 10 km"]}
            value={distance}
            onChange={setDistance}
          />
          <FilterChips options={["Any time", "Today", "Tomorrow"]} value={time} onChange={setTime} />
        </div>

        <div className="mt-4 space-y-3">
          {list.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
          {list.length === 0 ? (
            <div className="rounded-3xl bg-card p-8 text-center shadow-card">
              <p className="text-sm font-bold text-foreground">No matching job requests</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try widening your filters or increasing your service radius.
              </p>
            </div>
          ) : null}
        </div>
      </ScreenBody>
    </PhoneScreen>
  );
}
