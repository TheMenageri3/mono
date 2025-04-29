// Interview test data will go here
export const TEST_INTERVIEWS = [
    {
        scheduledDate: new Date('2024-02-15T10:00:00Z'),
        durationMinutes: 60,
        interviewLocationType: 'REMOTE',
        preparationNotes: 'Review candidate portfolio and resume',
        status: 'SCHEDULED',
        feedback: null,
        candidateFeedback: null,
        nextSteps: 'Technical assessment to be completed'
    },
    {
        scheduledDate: new Date('2024-02-16T14:30:00Z'),
        durationMinutes: 45,
        interviewLocationType: 'ON_SITE',
        preparationNotes: 'Prepare technical questions',
        status: 'COMPLETED',
        feedback: 'Strong technical skills, good cultural fit',
        candidateFeedback: 'Positive experience, team seemed welcoming',
        nextSteps: 'Schedule follow-up with hiring manager'
    }
];
