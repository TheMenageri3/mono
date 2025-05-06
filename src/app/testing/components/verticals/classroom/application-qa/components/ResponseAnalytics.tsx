import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, ChevronRight, Users } from "lucide-react";

interface ResponseData {
  question: string;
  questionType: string;
  totalResponses: number;
  completionRate: number;
  answers?: {
    value: string;
    count: number;
    percentage: number;
  }[];
}

interface ResponseAnalyticsProps {
  data: ResponseData[];
  totalApplicants: number;
  completedApplications: number;
}

export function ResponseAnalytics({
  data,
  totalApplicants,
  completedApplications,
}: ResponseAnalyticsProps) {
  const completionRate = Math.round(
    (completedApplications / totalApplicants) * 100
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              Response Analytics
            </CardTitle>
            <CardDescription>
              Analysis of application question responses
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {totalApplicants} Applicants
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">
              Application Completion Rate
            </span>
            <span className="text-sm">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedApplications} completed</span>
            <span>{totalApplicants - completedApplications} in progress</span>
          </div>
        </div>

        <ScrollArea className="max-h-[400px]">
          {data.map((item, index) => (
            <div key={index} className="py-4 border-t">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{item.question}</h4>f{" "}
                  {/* Fix: Changed from <p> to <div> to avoid invalid HTML structure */}
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Badge variant="outline" className="font-normal text-xs">
                      {item.questionType}
                    </Badge>
                    <span>{item.completionRate}% response rate</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              {item.answers && item.answers.length > 0 && (
                <div className="space-y-2 mt-3">
                  {item.answers.map((answer, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{answer.value}</span>
                        <span>
                          {answer.count} ({answer.percentage}%)
                        </span>
                      </div>
                      <Progress value={answer.percentage} className="h-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
