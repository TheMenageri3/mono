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
];
