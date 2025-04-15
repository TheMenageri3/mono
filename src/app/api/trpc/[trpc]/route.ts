import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: async () => {
        try {
          const context = await createTRPCContext({ headers: req.headers });
          return context;
        } catch (error) {
          console.error("Error creating TRPC context:", error);
          throw error;
        }
      },
      onError: ({ error, path }) => {
        console.error(`Error in TRPC handler [${path}]:`, error);
      },
    });
  } catch (error) {
    console.error("Error in TRPC request handler:", error);
    throw error;
  }
};

export { handler as GET, handler as POST };
