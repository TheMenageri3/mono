
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AdminCommentScalarFieldEnum = {
  id: 'id',
  visibility: 'visibility',
  category: 'category',
  priority: 'priority',
  resolved: 'resolved',
  commentId: 'commentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.AnswerScalarFieldEnum = {
  id: 'id',
  questionId: 'questionId',
  value: 'value',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  assignmentId: 'assignmentId'
};

exports.Prisma.AssignmentScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  status: 'status',
  submissionType: 'submissionType',
  submissionInstructions: 'submissionInstructions',
  pointsPossible: 'pointsPossible',
  gradingRubric: 'gradingRubric',
  releaseDate: 'releaseDate',
  dueDate: 'dueDate',
  allowLateSubmissions: 'allowLateSubmissions',
  latePenalty: 'latePenalty',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  classId: 'classId'
};

exports.Prisma.AssignmentQuestionScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  questionId: 'questionId',
  order: 'order',
  required: 'required',
  points: 'points',
  section: 'section',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.AssignmentSubmissionScalarFieldEnum = {
  id: 'id',
  assignmentId: 'assignmentId',
  status: 'status',
  submissionText: 'submissionText',
  submissionUrl: 'submissionUrl',
  submittedAt: 'submittedAt',
  gradedAt: 'gradedAt',
  score: 'score',
  feedback: 'feedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  gradedById: 'gradedById',
  profileId: 'profileId'
};

exports.Prisma.AssignmentSubmissionAnswerScalarFieldEnum = {
  id: 'id',
  assignmentSubmissionId: 'assignmentSubmissionId',
  questionId: 'questionId',
  assignmentQuestionId: 'assignmentQuestionId',
  answerId: 'answerId',
  value: 'value',
  feedback: 'feedback',
  pointsAwarded: 'pointsAwarded',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.ClassScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  shortDescription: 'shortDescription',
  year: 'year',
  quarter: 'quarter',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  enrollmentCapacity: 'enrollmentCapacity',
  syllabusUrl: 'syllabusUrl',
  meetingSchedule: 'meetingSchedule',
  location: 'location',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.ClassApplicationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  classId: 'classId',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  profileId: 'profileId'
};

exports.Prisma.ClassApplicationAnswerScalarFieldEnum = {
  id: 'id',
  questionId: 'questionId',
  classApplicationId: 'classApplicationId',
  answerId: 'answerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.ClassApplicationQuestionScalarFieldEnum = {
  id: 'id',
  classApplicationId: 'classApplicationId',
  questionId: 'questionId',
  order: 'order',
  required: 'required',
  points: 'points',
  section: 'section',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  text: 'text',
  userId: 'userId',
  assignmnetId: 'assignmnetId',
  applicationId: 'applicationId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  assignmentId: 'assignmentId',
  classApplicationId: 'classApplicationId',
  commentId: 'commentId'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  logoId: 'logoId',
  website: 'website',
  size: 'size',
  foundedYear: 'foundedYear',
  headquarters: 'headquarters',
  locations: 'locations',
  missionStatement: 'missionStatement',
  benefits: 'benefits',
  culture: 'culture',
  active: 'active',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.CompanyContactScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  title: 'title',
  department: 'department',
  isPrimary: 'isPrimary',
  engagementLevel: 'engagementLevel',
  lastContactDate: 'lastContactDate',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  userId: 'userId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  profileId: 'profileId'
};

exports.Prisma.EnrollmentScalarFieldEnum = {
  id: 'id',
  status: 'status',
  enrollmentDate: 'enrollmentDate',
  completionDate: 'completionDate',
  finalGrade: 'finalGrade',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  classId: 'classId',
  userId: 'userId',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  shortDescription: 'shortDescription',
  type: 'type',
  isVirtual: 'isVirtual',
  virtualMeetingUrl: 'virtualMeetingUrl',
  startDatetime: 'startDatetime',
  endDatetime: 'endDatetime',
  timezone: 'timezone',
  registrationRequired: 'registrationRequired',
  registrationUrl: 'registrationUrl',
  registrationDeadline: 'registrationDeadline',
  capacity: 'capacity',
  cost: 'cost',
  status: 'status',
  featured: 'featured',
  parentEventId: 'parentEventId',
  locationId: 'locationId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.EventAttendeeScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  userId: 'userId',
  attendanceStatus: 'attendanceStatus',
  attendanceType: 'attendanceType',
  notes: 'notes',
  feedback: 'feedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.EventCompanyScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  companyId: 'companyId',
  attendanceStatus: 'attendanceStatus',
  attendanceType: 'attendanceType',
  notes: 'notes',
  feedback: 'feedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.IndustryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  parentIndustryId: 'parentIndustryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.InterviewScalarFieldEnum = {
  id: 'id',
  jobApplicationId: 'jobApplicationId',
  type: 'type',
  scheduledDate: 'scheduledDate',
  durationMinutes: 'durationMinutes',
  interviewLocationType: 'interviewLocationType',
  intervieweeId: 'intervieweeId',
  companyContactId: 'companyContactId',
  preparationNotes: 'preparationNotes',
  status: 'status',
  feedback: 'feedback',
  candidateFeedback: 'candidateFeedback',
  nextSteps: 'nextSteps',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.JobApplicationScalarFieldEnum = {
  id: 'id',
  jobPostingId: 'jobPostingId',
  coverLetter: 'coverLetter',
  resumeId: 'resumeId',
  additionalMaterialsIds: 'additionalMaterialsIds',
  status: 'status',
  referralUserId: 'referralUserId',
  referralSource: 'referralSource',
  submissionDate: 'submissionDate',
  withdrawnDate: 'withdrawnDate',
  withdrawnReason: 'withdrawnReason',
  internalNotes: 'internalNotes',
  applicantId: 'applicantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.JobApplicationQuestionScalarFieldEnum = {
  id: 'id',
  jobApplicationId: 'jobApplicationId',
  questionId: 'questionId',
  order: 'order',
  required: 'required',
  points: 'points',
  section: 'section',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.JobPostingIndustryScalarFieldEnum = {
  jobPostingId: 'jobPostingId',
  industryId: 'industryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.JobPostingScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  title: 'title',
  description: 'description',
  shortDescription: 'shortDescription',
  location: 'location',
  remoteOption: 'remoteOption',
  employmentType: 'employmentType',
  experienceLevel: 'experienceLevel',
  educationRequirements: 'educationRequirements',
  salaryMin: 'salaryMin',
  salaryMax: 'salaryMax',
  benefits: 'benefits',
  applicationInstructions: 'applicationInstructions',
  externalPostingUrl: 'externalPostingUrl',
  internalNotes: 'internalNotes',
  status: 'status',
  postedDate: 'postedDate',
  deadlineDate: 'deadlineDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.LocationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  city: 'city',
  stateProvince: 'stateProvince',
  postalCode: 'postalCode',
  country: 'country',
  latitude: 'latitude',
  longitude: 'longitude',
  type: 'type',
  capacity: 'capacity',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.MediaScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  storageType: 'storageType',
  url: 'url',
  originalFilename: 'originalFilename',
  sizeInBytes: 'sizeInBytes',
  mimeType: 'mimeType',
  metadata: 'metadata',
  userId: 'userId',
  profileId: 'profileId',
  companyId: 'companyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.PlacementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyId: 'companyId',
  jobApplicationId: 'jobApplicationId',
  jobTitle: 'jobTitle',
  employmentType: 'employmentType',
  startDate: 'startDate',
  endDate: 'endDate',
  isCurrent: 'isCurrent',
  salary: 'salary',
  compensationDetails: 'compensationDetails',
  matchQuality: 'matchQuality',
  placementFacilitatorId: 'placementFacilitatorId',
  verified: 'verified',
  verificationDate: 'verificationDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.PlacementFeedbackScalarFieldEnum = {
  id: 'id',
  placementId: 'placementId',
  feedbackType: 'feedbackType',
  respondentId: 'respondentId',
  satisfactionLevel: 'satisfactionLevel',
  preparednessRating: 'preparednessRating',
  skillsMatchRating: 'skillsMatchRating',
  cultureFitRating: 'cultureFitRating',
  feedbackText: 'feedbackText',
  improvementSuggestions: 'improvementSuggestions',
  followUpNeeded: 'followUpNeeded',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  jobTitle: 'jobTitle',
  department: 'department',
  bio: 'bio',
  profilePictureId: 'profilePictureId',
  email: 'email',
  phoneNumber: 'phoneNumber',
  timezone: 'timezone',
  languagePreference: 'languagePreference',
  notificationPreferences: 'notificationPreferences',
  locationId: 'locationId',
  companyId: 'companyId',
  walletAddress: 'walletAddress',
  socialMediaLinks: 'socialMediaLinks',
  customFields: 'customFields',
  onboardingCompleted: 'onboardingCompleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  shortDescription: 'shortDescription',
  status: 'status',
  visibility: 'visibility',
  githubUrl: 'githubUrl',
  demoUrl: 'demoUrl',
  outcome: 'outcome',
  challenges: 'challenges',
  isFeatured: 'isFeatured',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById',
  classId: 'classId',
  userId: 'userId'
};

exports.Prisma.ProjectCollaboratorScalarFieldEnum = {
  id: 'id',
  role: 'role',
  contributions: 'contributions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  profileId: 'profileId',
  createdById: 'createdById',
  updatedById: 'updatedById',
  projectId: 'projectId',
  userId: 'userId'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  text: 'text',
  description: 'description',
  type: 'type',
  required: 'required',
  order: 'order',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  category: 'category',
  department: 'department',
  level: 'level',
  isInternal: 'isInternal',
  userId: 'userId',
  companyId: 'companyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.AccountScalarFieldEnum = {
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refreshToken: 'refreshToken',
  accessToken: 'accessToken',
  expiresAt: 'expiresAt',
  tokenType: 'tokenType',
  scope: 'scope',
  idToken: 'idToken',
  sessionState: 'sessionState',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.AuthenticatorScalarFieldEnum = {
  credentialID: 'credentialID',
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  credentialPublicKey: 'credentialPublicKey',
  counter: 'counter',
  credentialDeviceType: 'credentialDeviceType',
  credentialBackedUp: 'credentialBackedUp',
  transports: 'transports'
};

exports.Prisma.SectionScalarFieldEnum = {
  id: 'id',
  header: 'header',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.TagScalarFieldEnum = {
  tagname: 'tagname',
  color: 'color',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  name: 'name',
  email: 'email',
  hashedPassword: 'hashedPassword',
  emailVerified: 'emailVerified',
  image: 'image',
  role: 'role',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  lastLogin: 'lastLogin'
};

exports.Prisma.UserSkillScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  tagname: 'tagname',
  selfRating: 'selfRating',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.VenueContactInfoScalarFieldEnum = {
  id: 'id',
  locationId: 'locationId',
  email: 'email',
  phone: 'phone',
  website: 'website',
  contactName: 'contactName',
  department: 'department',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.WalletScalarFieldEnum = {
  publicKey: 'publicKey',
  userId: 'userId',
  active: 'active',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.WorkHistoryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  companyName: 'companyName',
  companyId: 'companyId',
  title: 'title',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  isCurrent: 'isCurrent',
  location: 'location',
  employmentType: 'employmentType',
  achievements: 'achievements',
  references: 'references',
  verified: 'verified',
  profileId: 'profileId',
  createdById: 'createdById',
  updatedById: 'updatedById'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Visibility = exports.$Enums.Visibility = {
  ADMIN_ONLY: 'ADMIN_ONLY',
  INSTRUCTORS_ONLY: 'INSTRUCTORS_ONLY',
  STAFF_AND_INSTRUCTORS: 'STAFF_AND_INSTRUCTORS',
  STAFF_INSTRUCTORS_AND_STUDENT: 'STAFF_INSTRUCTORS_AND_STUDENT',
  PUBLIC: 'PUBLIC'
};

exports.Category = exports.$Enums.Category = {
  FEEDBACK: 'FEEDBACK',
  EVALUATION: 'EVALUATION',
  INTERNAL_NOTE: 'INTERNAL_NOTE',
  DECISION_RATIONALE: 'DECISION_RATIONALE',
  FOLLOWUP_REQUIRED: 'FOLLOWUP_REQUIRED'
};

exports.Priority = exports.$Enums.Priority = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

exports.AssignmentType = exports.$Enums.AssignmentType = {
  INDIVIDUAL: 'INDIVIDUAL',
  GROUP: 'GROUP',
  EXAM: 'EXAM',
  PROJECT: 'PROJECT',
  PREREQUISITE: 'PREREQUISITE'
};

exports.AssignmentStatus = exports.$Enums.AssignmentStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.SubmissionType = exports.$Enums.SubmissionType = {
  TEXT: 'TEXT',
  FILE: 'FILE',
  LINK: 'LINK',
  CODE: 'CODE',
  MIXED: 'MIXED'
};

exports.SubmissionStatus = exports.$Enums.SubmissionStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  LATE: 'LATE',
  GRADED: 'GRADED'
};

exports.QuarterType = exports.$Enums.QuarterType = {
  FALL: 'FALL',
  WINTER: 'WINTER',
  SUMMER: 'SUMMER',
  SPRING: 'SPRING'
};

exports.StatusType = exports.$Enums.StatusType = {
  UPCOMING: 'UPCOMING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  ACTIVE: 'ACTIVE',
  DRAFT: 'DRAFT',
  ARCHIVED: 'ARCHIVED'
};

exports.CommentStatus = exports.$Enums.CommentStatus = {
  ACTIVE: 'ACTIVE',
  EDITED: 'EDITED',
  DELETED: 'DELETED'
};

exports.CompanySize = exports.$Enums.CompanySize = {
  STARTUP: 'STARTUP',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  ENTERPRISE: 'ENTERPRISE'
};

exports.EngagementLevel = exports.$Enums.EngagementLevel = {
  ACTIVE: 'ACTIVE',
  RESPONSIVE: 'RESPONSIVE',
  PASSIVE: 'PASSIVE',
  INACTIVE: 'INACTIVE'
};

exports.EnrollmentStatus = exports.$Enums.EnrollmentStatus = {
  ENROLLED: 'ENROLLED',
  WAITLISTED: 'WAITLISTED',
  DROPPED: 'DROPPED',
  COMPLETED: 'COMPLETED'
};

exports.EventType = exports.$Enums.EventType = {
  CONFERENCE: 'CONFERENCE',
  WORKSHOP: 'WORKSHOP',
  NETWORKING: 'NETWORKING',
  HACKATHON: 'HACKATHON',
  CAREER_FAIR: 'CAREER_FAIR',
  INFO_SESSION: 'INFO_SESSION'
};

exports.EventStatus = exports.$Enums.EventStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

exports.EventAttendanceStatus = exports.$Enums.EventAttendanceStatus = {
  ATTENDING: 'ATTENDING',
  MAYBE: 'MAYBE',
  NOT_ATTENDING: 'NOT_ATTENDING'
};

exports.EventAttendanceType = exports.$Enums.EventAttendanceType = {
  ATTENDEE: 'ATTENDEE',
  SPEAKER: 'SPEAKER',
  SPONSOR: 'SPONSOR',
  STAFF: 'STAFF',
  OTHER: 'OTHER'
};

exports.InterviewType = exports.$Enums.InterviewType = {
  PHONE_SCREEN: 'PHONE_SCREEN',
  TECHNICAL: 'TECHNICAL',
  BEHAVIORAL: 'BEHAVIORAL',
  ONSITE: 'ONSITE',
  FINAL: 'FINAL'
};

exports.InterviewLocationType = exports.$Enums.InterviewLocationType = {
  PHYSICAL: 'PHYSICAL',
  VIRTUAL: 'VIRTUAL'
};

exports.InterviewStatus = exports.$Enums.InterviewStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  RESCHEDULED: 'RESCHEDULED'
};

exports.JobApplicationStatus = exports.$Enums.JobApplicationStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  INTERVIEWING: 'INTERVIEWING',
  OFFERED: 'OFFERED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  REJECTED: 'REJECTED'
};

exports.JobPostingRemoteOption = exports.$Enums.JobPostingRemoteOption = {
  ON_SITE: 'ON_SITE',
  HYBRID: 'HYBRID',
  REMOTE: 'REMOTE'
};

exports.JobPostingEmploymentType = exports.$Enums.JobPostingEmploymentType = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  INTERNSHIP: 'INTERNSHIP'
};

exports.JobPostingExperienceLevel = exports.$Enums.JobPostingExperienceLevel = {
  ENTRY: 'ENTRY',
  MID: 'MID',
  SENIOR: 'SENIOR',
  EXECUTIVE: 'EXECUTIVE'
};

exports.JobPostingStatus = exports.$Enums.JobPostingStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  FILLED: 'FILLED',
  CLOSED: 'CLOSED'
};

exports.LocationType = exports.$Enums.LocationType = {
  CAMPUS: 'CAMPUS',
  OFFICE: 'OFFICE',
  VENUE: 'VENUE',
  REMOTE: 'REMOTE'
};

exports.MediaType = exports.$Enums.MediaType = {
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE',
  PDF: 'PDF',
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
  OTHER: 'OTHER'
};

exports.StorageType = exports.$Enums.StorageType = {
  LOCAL: 'LOCAL',
  YOUTUBE: 'YOUTUBE',
  S3: 'S3',
  CLOUDINARY: 'CLOUDINARY',
  EXTERNAL: 'EXTERNAL'
};

exports.EmploymentType = exports.$Enums.EmploymentType = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  CONTRACT: 'CONTRACT',
  INTERNSHIP: 'INTERNSHIP'
};

exports.MatchQuality = exports.$Enums.MatchQuality = {
  EXCELLENT: 'EXCELLENT',
  GOOD: 'GOOD',
  FAIR: 'FAIR',
  POOR: 'POOR'
};

exports.FeedbackType = exports.$Enums.FeedbackType = {
  STUDENT: 'STUDENT',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN'
};

exports.SatisfactionLevel = exports.$Enums.SatisfactionLevel = {
  VERY_SATISFIED: 'VERY_SATISFIED',
  SATISFIED: 'SATISFIED',
  NEUTRAL: 'NEUTRAL',
  DISSATISFIED: 'DISSATISFIED',
  VERY_DISSATISFIED: 'VERY_DISSATISFIED'
};

exports.ProjectStatus = exports.$Enums.ProjectStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

exports.VisibilityStatus = exports.$Enums.VisibilityStatus = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
  INTERNAL: 'INTERNAL'
};

exports.QuestionType = exports.$Enums.QuestionType = {
  NUMBER: 'NUMBER',
  TEXT: 'TEXT',
  SELECT: 'SELECT',
  MULTISELECT: 'MULTISELECT',
  SCALE: 'SCALE',
  DATE: 'DATE'
};

exports.RoleCategory = exports.$Enums.RoleCategory = {
  EXECUTIVE: 'EXECUTIVE',
  MANAGEMENT: 'MANAGEMENT',
  TECHNICAL: 'TECHNICAL',
  BUSINESS: 'BUSINESS',
  OPERATIONS: 'OPERATIONS',
  OTHER: 'OTHER'
};

exports.RoleLevel = exports.$Enums.RoleLevel = {
  ENTRY: 'ENTRY',
  MID: 'MID',
  SENIOR: 'SENIOR',
  DIRECTOR: 'DIRECTOR',
  EXECUTIVE: 'EXECUTIVE',
  C_SUITE: 'C_SUITE'
};

exports.UserRole = exports.$Enums.UserRole = {
  ADMIN: 'ADMIN',
  STANDARD: 'STANDARD',
  INSTRUCTOR: 'INSTRUCTOR',
  MODERATOR: 'MODERATOR'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  DELETED: 'DELETED'
};

exports.Prisma.ModelName = {
  AdminComment: 'AdminComment',
  Answer: 'Answer',
  Assignment: 'Assignment',
  AssignmentQuestion: 'AssignmentQuestion',
  AssignmentSubmission: 'AssignmentSubmission',
  AssignmentSubmissionAnswer: 'AssignmentSubmissionAnswer',
  Class: 'Class',
  ClassApplication: 'ClassApplication',
  ClassApplicationAnswer: 'ClassApplicationAnswer',
  ClassApplicationQuestion: 'ClassApplicationQuestion',
  Comment: 'Comment',
  Company: 'Company',
  CompanyContact: 'CompanyContact',
  Enrollment: 'Enrollment',
  Event: 'Event',
  EventAttendee: 'EventAttendee',
  EventCompany: 'EventCompany',
  Industry: 'Industry',
  Interview: 'Interview',
  JobApplication: 'JobApplication',
  JobApplicationQuestion: 'JobApplicationQuestion',
  JobPostingIndustry: 'JobPostingIndustry',
  JobPosting: 'JobPosting',
  Location: 'Location',
  Media: 'Media',
  Placement: 'Placement',
  PlacementFeedback: 'PlacementFeedback',
  Profile: 'Profile',
  Project: 'Project',
  ProjectCollaborator: 'ProjectCollaborator',
  Question: 'Question',
  Role: 'Role',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Authenticator: 'Authenticator',
  Section: 'Section',
  Tag: 'Tag',
  User: 'User',
  UserSkill: 'UserSkill',
  VenueContactInfo: 'VenueContactInfo',
  Wallet: 'Wallet',
  WorkHistory: 'WorkHistory'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
