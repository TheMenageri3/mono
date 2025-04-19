import { createTRPCRouter } from "@/server/api/trpc";
import { createEventCompany } from "./create";
import { updateEventCompany } from "./update";
import { deleteEventCompany, restoreEventCompany } from "./delete";
import {
  getEventCompanyById,
  getEventCompanies,
  getEventCompanyByCompanyId,
  getEventCompaniesByEventId,
  getEventCompanyByAttendanceStatus,
  getEventCompanyByAttendanceType,
} from "./read";

export const eventCompanyRouter = createTRPCRouter({
  create: createEventCompany,
  update: updateEventCompany,
  delete: deleteEventCompany,
  restore: restoreEventCompany,
  getById: getEventCompanyById,
  getByCompanyId: getEventCompanyByCompanyId,
  getByEventId: getEventCompaniesByEventId,
  getByAttendanceStatus: getEventCompanyByAttendanceStatus,
  getByAttendanceType: getEventCompanyByAttendanceType,
  getAll: getEventCompanies,
});
