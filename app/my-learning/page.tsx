import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { buttonClasses } from "@/components/ui/button";
import { coursesHref } from "@/lib/routes";

export const metadata: Metadata = {
  title: "My Learning | Vertex",
};

export default async function MyLearningPage() {
  await auth.protect();

  return (
    <PageFrame>
      <SiteHeader activeHref="/my-learning" />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs items={[{ label: "My Learning" }]} />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="font-display text-[38px] leading-[44px] font-bold text-neutral-900">
            My Learning
          </h1>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center rounded-[12px] border border-canvas-line bg-canvas-element px-6 py-24 text-center sm:px-12">
          <h2 className="text-[24px] leading-8 font-semibold text-neutral-900">
            You haven&apos;t started any courses yet
          </h2>
          <p className="mt-4 max-w-lg text-[17px] leading-7 text-neutral-600">
            When you begin a course, your progress will appear here so you can easily pick up where you left off.
          </p>
          <div className="mt-10">
            <Link
              href={coursesHref}
              className={buttonClasses({ variant: "primary", size: "lg" })}
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </main>

      <ChartDecoration className="mt-auto" />
    </PageFrame>
  );
}
