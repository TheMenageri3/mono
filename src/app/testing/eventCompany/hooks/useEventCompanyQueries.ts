import { api, RouterInputs } from "@/trpc/react";
import type { z } from "zod";
import {
  getEventCompanyByIdSchema,
  getEventCompaniesByEventIdSchema,
  getEventCompanyByAttendanceStatusSchema,
  getEventCompanyByAttendanceTypeSchema,
  getEventCompanyByCompanyIdSchema,
  getEventCompaniesSchema,
  getDeletedEventCompaniesSchema,
} from "@/schemas";

// Type inference from schemas
type GetEventCompanyByIdInput = z.infer<typeof getEventCompanyByIdSchema>;
type GetEventCompaniesByEventIdInput = z.infer<
  typeof getEventCompaniesByEventIdSchema
>;
type GetEventCompanyByAttendanceStatusInput = z.infer<
  typeof getEventCompanyByAttendanceStatusSchema
>;
type GetEventCompanyByAttendanceTypeInput = z.infer<
  typeof getEventCompanyByAttendanceTypeSchema
>;
type GetEventCompanyByCompanyIdInput = z.infer<
  typeof getEventCompanyByCompanyIdSchema
>;
type GetAllEventCompaniesInput = z.infer<typeof getEventCompaniesSchema>;
type GetDeletedEventCompaniesInput = z.infer<
  typeof getDeletedEventCompaniesSchema
>;

export const useEventCompanyQueries = () => {
  const useEventCompanyById = (input: GetEventCompanyByIdInput) => {
    return api.eventCompany.getById.useQuery(input);
  };

  const useEventCompaniesByEventId = (
    input: GetEventCompaniesByEventIdInput = {
      eventId: "",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventCompany.getByEventId.useQuery(input);
  };

  const useEventCompanyByAttendanceStatus = (
    input: GetEventCompanyByAttendanceStatusInput = {
      attendanceStatus: "ATTENDING",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventCompany.getByAttendanceStatus.useQuery(input);
  };

  const useEventCompanyByAttendanceType = (
    input: GetEventCompanyByAttendanceTypeInput = {
      attendanceType: "SPONSOR",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventCompany.getByAttendanceType.useQuery(input);
  };

  const useEventCompanyByCompanyId = (
    input: GetEventCompanyByCompanyIdInput = {
      companyId: "",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventCompany.getByCompanyId.useQuery(input);
  };

  const useAllEventCompanies = (
    input: GetAllEventCompaniesInput = { limit: 10, offset: 0 }
  ) => {
    return api.eventCompany.getAll.useQuery(input);
  };

  const useDeletedEventCompanies = (
    input: GetDeletedEventCompaniesInput = { limit: 10, offset: 0 }
  ) => {
    return api.eventCompany.getDeleted.useQuery(input);
  };

  return {
    useEventCompanyById,
    useEventCompaniesByEventId,
    useEventCompanyByAttendanceStatus,
    useEventCompanyByAttendanceType,
    useEventCompanyByCompanyId,
    useAllEventCompanies,
    useDeletedEventCompanies,
  };
};
