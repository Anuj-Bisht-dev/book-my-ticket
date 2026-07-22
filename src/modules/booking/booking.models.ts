import z from "zod";

const bookingSeatData = z.object({
  id: z.number(),
  name: z.string().min(2).max(100).trim(),
});

export { bookingSeatData };
