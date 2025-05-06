import { AdoptersService } from "../../models/services/AdoptersService.ts";
import { should } from "chai";
import { AdoptersModel } from "../../models/request/AdoptersModel.ts";
import { generateAddAdoptersPayload } from "../../utils/generate-payloads.js";
import { ErrorResponse } from "../../models/responses/ErrorResponse.ts";
should();

describe("Add Adopter", () => {
  let adoptersService: AdoptersService;

  before(() => {
    adoptersService = new AdoptersService();
  });

  it("Success test - 201", async () => {
    const addAdopters = generateAddAdoptersPayload();
    const addAdoptersResponse = await adoptersService.addAdopters<AdoptersModel>(addAdopters);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Status Code:", addAdoptersResponse.status);
    console.log("Response Body:", JSON.stringify(addAdoptersResponse.data, null, 2));

    addAdoptersResponse.status.should.equal(201);
    addAdoptersResponse.data.should.have.property("id");
    addAdoptersResponse.data.id?.should.be.a("number");
    addAdoptersResponse.data.should.have.property("name", addAdopters.name);
    addAdoptersResponse.data.should.have.property("lastName", addAdopters.lastName);
    addAdoptersResponse.data.should.have.property("dateOfBirth");
    addAdoptersResponse.data.should.have.property("address", addAdopters.address);
  });

  it("Invalid name - 400", async () => {
    const invalidAddAdopters: any = generateAddAdoptersPayload();
    invalidAddAdopters.name = 0;
    const addAdoptersResponse =
      await adoptersService.addAdopters<ErrorResponse>(invalidAddAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("No name - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.name = "";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("Invalid lastname - 400", async () => {
    const invalidAddAdopters: any = generateAddAdoptersPayload();
    invalidAddAdopters.lastName = 0;
    const addAdoptersResponse =
      await adoptersService.addAdopters<ErrorResponse>(invalidAddAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("No lastname - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.lastName = "";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  // BUG: https://github.com/Espositosole/api-automation-training/issues/4
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("DateOfBirth < 18 years - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.dateOfBirth = "2020-04-24";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
    addAdoptersResponse.data.error.should.contain(
      "message",
      "The adopter must be at least 18 years old to adopt a cat",
    );
  });

  it("No DateOfBirth - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.dateOfBirth = "";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("Phone.length < 8  - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.phone = "1";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("No phone - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.phone = "";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("No address - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.address = "";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("Invalid address number - 400", async () => {
    const invalidAddAdopters: any = generateAddAdoptersPayload();
    invalidAddAdopters.address = 0;
    const addAdoptersResponse =
      await adoptersService.addAdopters<ErrorResponse>(invalidAddAdopters);

    addAdoptersResponse.status.should.equal(400);
  });

  it("Invalid address too short - 400", async () => {
    const addAdopters = generateAddAdoptersPayload();
    addAdopters.address = "A";
    const addAdoptersResponse = await adoptersService.addAdopters<ErrorResponse>(addAdopters);

    addAdoptersResponse.status.should.equal(400);
  });
});
