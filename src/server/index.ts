import Course from "@/lib/models/course.model";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  // api/trpc/getUsers
  getUsers: publicProcedure.query(async () => {
    return await Course.find();
  }),
  getUserByEmail: publicProcedure.query(async (req: any) => {
    console.log(req);
    return 1;
  }),
});

export type AppRouter = typeof appRouter;