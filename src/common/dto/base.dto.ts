import z, { ZodType } from "zod";

interface ValidateSuccess<T> {
  errors: null;
  value: T;
}

interface ValidateFailure {
  errors: string[];
  value: null;
}

export type ValidationResult<T> = ValidateSuccess<T> | ValidateFailure;

export class BaseDto {
  static schema: ZodType = z.object({});

  static validate<T = unknown>(data: unknown): ValidationResult<T> {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return { errors, value: null };
    }

    return { errors: null, value: result.data as T };
  }
}
