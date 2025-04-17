import { createTRPCRouter } from "../../trpc";
import { createCompanyContact } from "./create";
import {
  readCompanyContactsByCompanyId,
  readDeletedCompanyContactsByCompanyId,
  readCompanyContactsByUserId,
  readCompanyContactsByProfileId,
  readCompanyContactById,
  readCompanyContacts,
  readDeletedCompanyContacts,
} from "./read";
import { updateCompanyContact } from "./update";
import { deleteCompanyContact, restoreCompanyContact } from "./delete";

export const companyContactRouter = createTRPCRouter({
  create: createCompanyContact,
  read: readCompanyContacts,
  readById: readCompanyContactById,
  readByCompanyId: readCompanyContactsByCompanyId,
  readDeletedByCompanyId: readDeletedCompanyContactsByCompanyId,
  readByUserId: readCompanyContactsByUserId,
  readByProfileId: readCompanyContactsByProfileId,
  readDeleted: readDeletedCompanyContacts,
  update: updateCompanyContact,
  delete: deleteCompanyContact,
  restore: restoreCompanyContact,
});
