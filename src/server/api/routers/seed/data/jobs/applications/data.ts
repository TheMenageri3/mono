export const TEST_JOB_APPLICATIONS = [
    {
        coverLetter: "I am excited to apply for this position...",
        additionalMaterialsIds: ["media1", "media2"],
        status: "SUBMITTED",
        referralSource: "LinkedIn",
        submissionDate: new Date("2023-01-15"),
        withdrawnDate: null,
        withdrawnReason: null,
        internalNotes: "Strong candidate with relevant experience",
    },
    {
        coverLetter: "I would like to express my strong interest in the position. With my 5 years of experience in the field...",
        additionalMaterialsIds: [],
        status: "INTERVIEWING",
        referralSource: null,
        submissionDate: new Date("2023-02-01"),
        withdrawnDate: new Date("2023-02-15"),
        withdrawnReason: "Accepted another offer",
        internalNotes: "Candidate shows promise but withdrew due to another offer",
    }
];
