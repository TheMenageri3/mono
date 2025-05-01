import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobApplication } from "@/generated/prisma";
import { PencilIcon, Trash2Icon } from "lucide-react";




export default function JobApplicationCard({ job }: { job: JobApplication }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              Application Status: {job.status}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job?.coverLetter?.substring(0, 150)}...
            </p>
            <div className="flex gap-2 mt-2">
              <div className="flex flex-col gap-2">
                <Badge variant="secondary">
                  Referral Source: {job.referralSource || "N/A"}
                </Badge>
                <Badge variant="outline">
                  Submitted:{" "}
                  {job.submissionDate
                    ? new Date(job.submissionDate).toLocaleDateString()
                    : "Not submitted"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}