import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, ""),
  description: z.string().min(1, ""),
	mediaUrl: z.instanceof(FileList).refine((files) => {
		return files.length > 0;
	})
});