import { CompanyRole, DAOType, UniversityRole } from "@prisma/client";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";

export const NewProposalFormData = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters"),
  quorum: z.number().min(1, "Quorum must be at least 1"),
  endDate: z.date(),
  daoId: z.string(),
  publicKey: z.string(),
});

export const NewDAOFormData = z.object({
  name: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters"),
  type: z.enum([DAOType.NFT, DAOType.HYBRID, DAOType.TOKEN]),
  tokenPublicKey: z
    .string()
    .trim()
    .min(2, "Token public key must be at least 2 characters"),
  allowSubDAO: z.boolean(),
  // subDAOCreationThreshold: z
  //   .number()
  //   .min(1, "Sub DAO creation threshold must be at least 1"),
});

export const NewCampaignFormData = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters"),
  goal: z.number().min(1, "Goal must be at least 1"),
  end: z.date(),
});

export const NewPledgeFormData = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  message: z.string().trim().min(2, "Message must be at least 2 characters"),
});

export const frontendExperienceOptions = [
  "React",
  "React Native",
  "Bootstrap",
  "Tailwind",
  "CSS",
  "Node",
  "JavaScript",
  "Typescript",
  "Anchor",
  "Poseidon",
  "Figma",
  "Canva",
  "Oracles",
  "APIs",
  "Wallets",
  "Blinks",
  "Web3js",
];

export const ApplyFrontendCourseFormData = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  discord: z.string().trim().min(2, "Discord must be at least 2 characters"),
  github: z.string().trim().min(2, "Github must be at least 2 characters"),
  wallet: z
    .string()
    .trim()
    .refine(
      (value) => {
        try {
          new PublicKey(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid wallet address",
      },
    ),
  motivation: z.string().trim().min(2, "Why must be at least 2 characters"),
  experience: z.array(
    z.object({
      experience: z.enum(frontendExperienceOptions as [string, ...string[]]),
      level: z.number().min(1).max(5),
    }),
  ),
  employed: z.boolean(),
  employer: z
    .string()
    .trim()
    .min(2, "Employer must be at least 2 characters")
    .optional(),
  support: z.boolean().optional(),
  agree: z.boolean(),
});

export const ApplyBuildersCourseFormData = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  discord: z.string().trim().min(2, "Discord must be at least 2 characters"),
  github: z.string().trim().min(2, "Github must be at least 2 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters"),
  country: z.string().trim().min(2, "Country must be at least 2 characters"),
  timezone: z.string().trim().min(2, "Timezone must be at least 2 characters"),
  start: z.enum([
    "Hackathon",
    "Bootcamp",
    "Superteams",
    "EasyA App",
    "Rise In Bootcamp",
    "Other",
  ]),
  course: z.enum(["Solana Q1 2025 Builders", "Solana Q1 Advanced"]),
  why: z.string().trim().min(2, "Why must be at least 2 characters"),
  interests: z.enum([
    "Defi",
    "NFTs",
    "Gaming",
    "Refi",
    "Social",
    "Tooling/Infra",
    "Payments",
    "DAO/Governance",
  ]),
  jsExperience: z.enum([
    "Jr Dev Capacity",
    "None",
    "Novice (Independent Learning)",
    "Intermediate (Read and Write Code)",
    "Bootcamp/Formal Learning (<6 Months)",
    "Sr Dev Capacity",
    "University/College",
  ]),
  rustExperience: z.enum([
    "Jr Dev Capacity",
    "None",
    "Novice (Independent Learning)",
    "Intermediate (Read and Write Code)",
    "Bootcamp/Formal Learning (<6 Months)",
    "Sr Dev Capacity",
    "University/College",
  ]),
  cExperience: z.enum([
    "Jr Dev Capacity",
    "None",
    "Novice (Independent Learning)",
    "Intermediate (Read and Write Code)",
    "Bootcamp/Formal Learning (<6 Months)",
    "Sr Dev Capacity",
    "University/College",
  ]),
  relevantCourses: z
    .string()
    .trim()
    .min(2, "Relevant courses must be at least 2 characters"),
  operatingSystem: z
    .string()
    .trim()
    .min(2, "Operating system must be at least 2 characters"),
  commitment: z.enum(["10-20 hours/week", "20-30 hours/week", "Full Time"]),
  editor: z.enum([
    "Emacs",
    "Vim",
    "Nano",
    "VsCode",
    "Notepad",
    "Sublime",
    "Hyper",
    "Helix",
    "NeoVim",
    "Visual Basic",
  ]),
  IDE: z.enum([
    "JetBrains",
    "VSCode",
    "Neovim",
    "Solana PG",
    "Other",
    "Webstorm",
    "Intellij",
    "Replit",
  ]),
  intent: z.string().trim().min(2, "Intent must be at least 2 characters"),
  wallet: z.string().trim().min(2, "Wallet must be at least 2 characters"),
  priorClasses: z.array(
    z.enum([
      "RiseIn - Turbin3 Bridge Course",
      "RiseIn - Solana Bootcamp",
      "RiseIn - Sui Bootcamp",
      "EasyA Solana Course",
      "EasyA Sui Course",
    ]),
  ),
  initials: z
    .string()
    .trim()
    .min(2, "Initial interest must be at least 2 characters"),
});

export const ProfileFormData = z.object({
  // company: z.string().trim().optional(),
  // companyRole: z.nativeEnum(CompanyRole).optional(),
  university: z.string().trim().optional(),
  universityRole: z.nativeEnum(UniversityRole).optional(),
  graduated: z.boolean().optional(),
  type: z.enum(["Student", "Developer", "Company"]).optional(),
  // username: z
  //   .string()
  //   .trim()
  //   .min(5, "Username must be at least 5 characters")
  //   .optional(),
  // bio: z.string().trim().max(500, "Bio must be 500 words or less").optional(),
  // interests: z.array(z.string()).optional(),
  // currentInterest: z.string().trim().optional(),
  // profileImage: z.string().optional(),
});

export const PaperFormData = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  authors: z.string().trim().min(5, "Must be at least 1 author"),
  description: z
    .string()
    .trim()
    .min(250, "Description must be at least 250 words"),
  domains: z.string().trim().min(5, "Must be at least 1 domain"),
  paperImage: z.string().optional(),
  paperFile: z
    .instanceof(File, { message: "Please upload a PDF file" })
    .refine(
      (file) => file.size <= 5000000,
      "File size should be less than 5 MB",
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed",
    ),
  price: z.number().default(0),
});

export const ReviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  rating: z.number(),
  reviewers: z.object({
    id: z.string(),
    name: z.string(),
  }),
  user_id: z.string(),
  paper_id: z.string(),
});

export const PaperSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  paper_pubkey: z.string().nullable(),
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  status: z.string(),
  authors: z.array(z.string()),
  domains: z.array(z.string()),
  description: z
    .string()
    .trim()
    .min(250, "Description must be at least 250 words"),
  price: z.number().nullable(),
  image_url: z.string(),
  pdf_url: z.string(),
  minted: z.array(
    z.object({
      user_id: z.string(),
      // TODO: Add user_wallet_address when available
    }),
  ),
  version: z.number(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  peer_reviews: z.array(ReviewSchema),
});

export const BountyFormData = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string(),
  track: z.enum(["FRONTEND", "BACKEND", "RUST"]),
  compensationAmount: z.number().min(0, "Cannot pay negative amount"),
  pointOfContactId: z.string(),
  skills: z.array(z.string()),
  tokenId: z.string(),
  companyId: z.string().optional(),
});

export const TokenFormData = z.object({
  name: z.string(),
  ticker: z.string(),
  address: z.string(),
  image: z.string(),
  decimals: z.number().min(0, "Cannot have a negative number of decimals!"),
});

export const RatingSchema = z.object({
  qualityOfResearch: z.number().min(1).max(5),
  potentialForRealWorldUseCase: z.number().min(1).max(5),
  domainKnowledge: z.number().min(1).max(5),
  practicalityOfResultObtained: z.number().min(1).max(5),
});

// TypeScript types
export type ProfileFormData = z.infer<typeof ProfileFormData>;
export type PaperFormData = z.infer<typeof PaperFormData>;
export type Review = z.infer<typeof ReviewSchema>;
export type Paper = z.infer<typeof PaperSchema>;
export type Rating = z.infer<typeof RatingSchema>;
