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
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.STAFF,
    notes: "Event coordinator",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.OTHER,
    notes: "Press representative",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.MAYBE,
    attendanceType: EventAttendanceType.SPEAKER,
    notes: "Backup speaker - confirm availability",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.ATTENDEE,
    notes: "Student group leader",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.SPONSOR,
    notes: "Silver sponsor representative",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.ATTENDING,
    attendanceType: EventAttendanceType.STAFF,
    notes: "Registration desk volunteer",
    feedback: null,
  },
  {
    attendanceStatus: EventAttendanceStatus.NOT_ATTENDING,
    attendanceType: EventAttendanceType.ATTENDEE,
    notes: "Registered but cancelled last minute",
    feedback: "Will attend next year's event",
  },
];
