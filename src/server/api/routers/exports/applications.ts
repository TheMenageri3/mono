import { protectedProcedure } from "~/server/api/trpc";

import { createObjectCsvWriter } from "csv-writer";
import { z } from "zod";

export const exportApplications = protectedProcedure
  .input(
    z.object({
      courseId: z.string(),
      outputPath: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { courseId, outputPath } = input;
    const applications = await ctx.db.courseApplication.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        applicant: {
          include: {
            externalProfiles: true,
          },
        },
        experience: true,
      },
    });

    // Transform the data for CSV export
    const records = applications.map((app) => {
      // Get social profiles
      const twitter =
        app.applicant.externalProfiles.find((p) => p.platform === "Twitter")
          ?.username || "";
      const github =
        app.applicant.externalProfiles.find((p) => p.platform === "Github")
          ?.username || "";
      const linkedin =
        app.applicant.externalProfiles.find((p) => p.platform === "LinkedIn")
          ?.username || "";
      const discord =
        app.applicant.externalProfiles.find((p) => p.platform === "Discord")
          ?.username || "";

      // Combine experiences into comma-separated strings
      const experiences = app.experience.map((e) => e.experience).join("; ");
      const levels = app.experience.map((e) => e.level.toString()).join("; ");

      return {
        applicationId: app.id,
        submittedAt: app.createdAt.toISOString(),
        applicantName: app.applicant.name || "",
        applicantEmail: app.applicant.email || "",
        applicantUsername: app.applicant.username || "",
        organization: app.applicant.organization || "",
        isVerified: app.applicant.isVerified ? "Yes" : "No",
        motivation: app.motivation,
        employed: app.employed ? "Yes" : "No",
        employer: app.employer || "",
        needsSupport: app.support ? "Yes" : "No",
        experiences: experiences,
        experienceLevels: levels,
        twitterHandle: twitter,
        githubUsername: github,
        linkedinUsername: linkedin,
        discordUsername: discord,
      };
    });

    // Configure CSV Writer
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: [
        { id: "applicationId", title: "Application ID" },
        { id: "submittedAt", title: "Submitted At" },
        { id: "applicantName", title: "Name" },
        { id: "applicantEmail", title: "Email" },
        { id: "applicantUsername", title: "Username" },
        { id: "organization", title: "Organization" },
        { id: "isVerified", title: "Verified" },
        { id: "motivation", title: "Motivation" },
        { id: "employed", title: "Currently Employed" },
        { id: "employer", title: "Employer" },
        { id: "needsSupport", title: "Needs Support" },
        { id: "experiences", title: "Experiences" },
        { id: "experienceLevels", title: "Experience Levels" },
        { id: "twitterHandle", title: "Twitter" },
        { id: "githubUsername", title: "GitHub" },
        { id: "linkedinUsername", title: "LinkedIn" },
        { id: "discordUsername", title: "Discord" },
      ],
    });

    // Write the CSV file
    await csvWriter.writeRecords(records);

    return {
      success: true,
      path: outputPath,
      recordCount: records.length,
    };
  });
