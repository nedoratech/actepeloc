import * as yup from "yup";
import { validateSchema } from "../../../src/api/validators/utils/validateSchema";

describe("validateSchema", () => {
  it("should return success with valid data", async () => {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      age: yup.number().positive().required(),
    });

    const validData = {
      name: "John Doe",
      email: "john@example.com",
      age: 25,
    };

    const result = await runValidateSchema<typeof validData>(validData, schema);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  it("should return errors with invalid data", async () => {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      age: yup.number().positive().required(),
    });

    const invalidData = {
      name: "",
      email: "invalid-email",
      age: -5,
    };

    const result = await runValidateSchema<typeof invalidData>(invalidData, schema);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(3);
    expect(result.errors[0].field).toBe("name");
    expect(result.errors[1].field).toBe("email");
    expect(result.errors[2].field).toBe("age");
  });

  it("should strip unknown fields when validation succeeds", async () => {
    const schema = yup.object({
      name: yup.string().required(),
    });

    const dataWithExtraFields = {
      name: "John Doe",
      extraField: "should be stripped",
      anotherField: 123,
    };

    const result = await runValidateSchema(dataWithExtraFields, schema);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ name: "John Doe" });
    expect(result.data).not.toHaveProperty("extraField");
    expect(result.data).not.toHaveProperty("anotherField");
  });
});

const runValidateSchema = async <T extends yup.AnyObject>(data: T, schema: yup.ObjectSchema<T>) => {
  return (await validateSchema<T>(schema, data)) as {
    success: boolean;
    data: T | undefined;
    errors: { field: string; message: string }[];
  };
};
