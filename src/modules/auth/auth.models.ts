import z from "zod";

export const registerModel = z.object({
  name: z.string().max(100).trim().min(2),
  email: z.string().lowercase().max(322).trim(),
  password: z.string().min(8).max(66),
});
