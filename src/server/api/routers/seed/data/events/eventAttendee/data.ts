import {
  EventAttendanceStatus,
  EventAttendanceType,
} from "@/generated/prisma/client";

export const TEST_EVENT_ATTENDEES = [
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.ATTENDEE,
    notes: "VIP guest - needs special accommodations",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPEAKER,
    notes: "Keynote speaker - needs AV setup",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.MAYBE,
    attendanceType: EventAttendanceType.ATTENDEE,
    notes: "Waiting for approval from manager",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Gold sponsor representative",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.NOT_ATTENDING,
    attendanceType: EventAttendanceType.ATTENDEE,
    notes: "Cancelled due to scheduling conflict",
    feedback: null,
  },
];
