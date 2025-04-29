import {
  EventAttendanceStatus,
  EventAttendanceType,
} from "@/generated/prisma/client";

export const TEST_EVENT_COMPANIES = [
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Platinum sponsor - main stage branding rights",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Gold sponsor - booth space and speaking slot",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.MAYBE,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Potential silver sponsor - awaiting budget approval",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.OTHER,
    notes: "Media partner - press coverage and interviews",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.NOT_ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Withdrawn due to company policy changes",
    feedback: "Hope to participate in future events",
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Bronze sponsor - digital presence only",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.OTHER,
    notes: "Community partner - organizing side events",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.MAYBE,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "In-kind sponsor - providing equipment",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Diversity sponsor - supporting underrepresented groups",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.OTHER,
    notes: "Educational partner - providing training materials",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Startup sponsor - supporting early-stage companies",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.NOT_ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Previous sponsor - focusing on other initiatives",
    feedback: "Looking forward to next year's event",
  },
];
