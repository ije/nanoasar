import { describe, expect, test } from "bun:test";
import { createPackageWithOptions, listPackage } from "./asar.mjs";

describe("ASAR Package Tests", () => {
  test("create and list package", async () => {
    const packagePath = "test.asar";
    const sourceDir = ".";

    // Create an ASAR package
    await createPackageWithOptions(sourceDir, packagePath, {
      pattern: ["/package.json"], // Include all .json files
    });

    // List the contents of the ASAR package
    const contents = await listPackage(packagePath, { isPackage: false });
    console.log("Contents of ASAR package:", contents);

    // Assert that the package.json file is included in the ASAR package
    expect(contents.length).toEqual(1);
    expect(contents).toContain("/package.json");
  });
});
