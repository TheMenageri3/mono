import { protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { CompanyRole, UniversityRole } from "@prisma/client";
export const createUser = protectedProcedure
  .input(
    z.object({
      // username: z.string(),
      // bio: z.string(),
      // profileImage: z.string(),
      type: z.string(),
      // interests: z.array(z.string()).optional(),
      // company: z.string().optional(),
      university: z.string().optional(),
      // companyRole: z.nativeEnum(CompanyRole).optional(),
      universityRole: z.nativeEnum(UniversityRole).optional(),
      graduated: z.boolean().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const email = ctx.session?.user?.email;
    if (!email) {
      throw new Error("Email is required");
    }
    const {
      // username,
      // bio,
      // profileImage,
      type,
      // interests,
      // company,
      university,
      graduated,
    } = input;
    const newUser = await ctx.db.user.update({
      where: { email },
      data: {
        // username,
        // bio,
        // image: profileImage,
        type,
        isVerified: true,
      },
    });
    // let _company = await ctx.db.company.findFirst({ where: { name: company } });

    // if (!_company && company) {
    //   _company = await ctx.db.company.create({ data: { name: company } });
    // }
    // if (_company) {
    //   await ctx.db.companyUser.create({
    //     data: {
    //       companyId: _company.id,
    //       userId: newUser.id,
    //       role: input.companyRole,
    //     },
    //   });
    // }

    let _university = await ctx.db.university.findFirst({
      where: { name: university },
    });
    if (!_university && university) {
      _university = await ctx.db.university.create({
        data: { name: university },
      });
    }
    if (_university) {
      await ctx.db.universityUser.create({
        data: {
          universityId: _university.id,
          userId: newUser.id,
          role: input.universityRole,
          graduated,
        },
      });
    }

    // for (const interest of interests) {
    //   let _interest = await ctx.db.interest.findFirst({
    //     where: { name: interest },
    //   });
    //   if (!_interest) {
    //     _interest = await ctx.db.interest.create({ data: { name: interest } });
    //   }
    //   await ctx.db.user.update({
    //     where: { id: newUser.id },
    //     data: { interests: { connect: { id: _interest.id } } },
    //   });
    // }

    return newUser;
  });
