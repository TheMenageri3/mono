import PaperContentComponent from "~/_components/final/Paper/PaperContent";
import { notFound } from "next/navigation";
import { PaperSchema } from "~/lib/validation";
import type { Paper } from "~/lib/validation";
import papers from "~/constants/dummyPapers.json";
export default async function PaperContentPage({
  params,
}: {
  params: { paper_id: string };
}) {
  const paperId = params.paper_id;
  const paperData = papers.find((paper) => paper.id === paperId);

  if (!paperData) {
    notFound();
  }

  let paper: Paper;

  try {
    paper = PaperSchema.parse(paperData);
  } catch (error) {
    console.error("Invalid paper data:", error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <PaperContentComponent _paper={paper} />
    </div>
  );
}
