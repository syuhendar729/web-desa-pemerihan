import * as z from "zod";

const imgSize = 3 * 1024 * 1024;

const ALLOWED_IMG_MIME = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
] as const;

export const UploadImgMetaSchema = z.object({
  originalname: z.string().min(1),
  mimetype: z.enum(ALLOWED_IMG_MIME),
  size: z.number().max(imgSize),
});
