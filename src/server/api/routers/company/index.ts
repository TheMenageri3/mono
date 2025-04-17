import { createTRPCRouter } from "../../trpc";
import { createCompany } from "./create";
import {
  readCompanyById,
  readCompanies,
  readDeletedCompanies,
  readCompaniesByIndustry,
  searchCompanies,
} from "./read";
import {
  updateCompany,
  addIndustryToCompany,
  removeIndustryFromCompany,
} from "./update";
import { deleteCompany, restoreCompany } from "./delete";

export const companyRouter = createTRPCRouter({
  create: createCompany,
  readById: readCompanyById,
  read: readCompanies,
  readDeleted: readDeletedCompanies,
  readByIndustry: readCompaniesByIndustry,
  search: searchCompanies,
  update: updateCompany,
  addIndustry: addIndustryToCompany,
  removeIndustry: removeIndustryFromCompany,
  delete: deleteCompany,
  restore: restoreCompany,
});
