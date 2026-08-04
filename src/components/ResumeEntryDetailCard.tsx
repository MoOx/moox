import { ResumeItem } from "@/api";
import ExperienceCard from "@/components/ExperienceCard";
import { bodyBeforeFirstHr, monthRange, pitchOf, resumeEntryTransitionName } from "@/profile";

/**
 * One resume entry in detail: the `ExperienceCard` full mode fed from the
 * entry's data (pitch, markdown body, stats as tiles, proof links). Used by
 * the `/resume` modal and the standalone `/resume/<slug>` and
 * `/resume/group/<group>` pages.
 */
export default function ResumeEntryDetailCard({
  item,
  transitionEnabled = true,
}: {
  item: ResumeItem;
  /**
   * The card and its detail share a view-transition name (the "zoom"
   * effect). Disable it on every instance but one when several are on
   * screen - duplicate names make the browser skip the transition.
   */
  transitionEnabled?: boolean;
}) {
  return (
    <ExperienceCard
      mode="full"
      icon={item.icon}
      image={item.image}
      pretitle={item.job_title}
      title={item.title}
      company={item.company}
      dates={monthRange(item)}
      text={pitchOf(item)}
      body={bodyBeforeFirstHr(item.body)}
      stats={item.stats}
      tags={item.hashtags}
      links={item.links}
      style={
        transitionEnabled ? { viewTransitionName: resumeEntryTransitionName(item) } : undefined
      }
    />
  );
}
