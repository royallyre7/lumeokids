import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
    email: z.string().email("Please enter a valid email address").max(255, "Email must be at most 255 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(128, "Password must be at most 128 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

export const childProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
  dateOfBirth: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Please enter a valid date" }
  ),
  learningLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  interests: z.string().max(500, "Interests must be at most 500 characters").optional(),
  strengths: z.string().max(500, "Strengths must be at most 500 characters").optional(),
  weaknesses: z.string().max(500, "Weaknesses must be at most 500 characters").optional(),
});

export const assessmentSchema = z.object({
  sectionScores: z.record(
    z.string(),
    z.object({
      total: z.number().min(0).max(50),
      questions: z.array(z.number().min(0).max(5)),
    })
  ),
  interests: z.array(z.string()).max(20, "Too many interests selected"),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChildProfileInput = z.infer<typeof childProfileSchema>;
