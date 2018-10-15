// import Test from "supertest";
import square from "../src/utils";

describe("should calculate square", () => {
    test("square of 8", () => {
        expect(square(8)).toBe(64);

        expect({ name: "" }).toHaveProperty("name");
    });
});

