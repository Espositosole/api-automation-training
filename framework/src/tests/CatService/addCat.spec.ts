import { AdoptersModel } from "../../models/request/AdoptersModel.js";
import { CatsModel } from "../../models/request/CatsModel.js";
import { ErrorResponse } from "../../models/responses/ErrorResponse.js";
import { AdoptersService } from "../../models/services/AdoptersService.js";
import { CatsService } from "../../models/services/CatsService.js";
import { generateAddAdoptersPayload, generateAddCatsPayload } from "../../utils/generate-payloads.js";

describe("Add Cat", () => {
  let catsService: CatsService;
  let adoptersService: AdoptersService;
  let adopterId: number;

  before(async () => {
    adoptersService = new AdoptersService();
    const addAdopters = generateAddAdoptersPayload();
    const addAdoptersResponse = await adoptersService.addAdopters<AdoptersModel>(addAdopters);
    adopterId = addAdoptersResponse.data.id ?? -1;
    catsService = new CatsService();
  });

  it("Success test - 200", async () => {
    const addCats = generateAddCatsPayload();
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);

    addCatsResponse.status.should.equal(201);
    addCatsResponse.data.should.have.property("id");
    addCatsResponse.data.id.should.be.a("number");
    addCatsResponse.data.should.have.property("name", addCats.name);
    addCatsResponse.data.should.have.property("age", addCats.age);
    addCatsResponse.data.should.have.property("breed", addCats.breed);
    addCatsResponse.data.should.have.property("dateJoined");
    addCatsResponse.data.should.have.property("vaccinated", addCats.vaccinated);
    addCatsResponse.data.should.have.property("temperament");
    addCatsResponse.data.should.have.property("staffInCharge", addCats.staffInCharge);
  });

  //BUG: https://github.com/Espositosole/api-automation-training/issues/10
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("Success test with adopterId - 200", async () => {
    const addCats = generateAddCatsPayload(); 
    addCats.isAdopted = true;
    addCats.adopterId = adopterId;
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);

    addCatsResponse.status.should.equal(201);
    addCatsResponse.data.should.have.property("isAdopted", addCats.isAdopted);
    addCatsResponse.data.should.have.property("adopterId", addCats.adopterId);
  });

  it("Invalid name - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.name = 0;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("No name - 400", async () => {
    const addCats = generateAddCatsPayload();
    addCats.name = "";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid age - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.age = "0";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("No age - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.age = undefined;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid breed - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.breed = 0;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("No breed - 400", async () => {
    const addCats = generateAddCatsPayload();
    addCats.breed = "";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(400);
  });

  //BUG: https://github.com/Espositosole/api-automation-training/issues/7
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("Invalid dateJoined - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.dateJoined = "0";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid type dateJoined - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.dateJoined = 0;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  //BUG: https://github.com/Espositosole/api-automation-training/issues/7
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("No dateJoined - 400", async () => {
    const addCats = generateAddCatsPayload();
    addCats.dateJoined = "";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid vaccinated - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.vaccinated = "0";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("No vaccinated - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.vaccinated = undefined;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid temperament - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.temperament = 0;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });
  
  it("No temperament - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.temperament = undefined;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid staffInCharge - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.staffInCharge = 0;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  it("No staffInCharge - 400", async () => {
    const addCats = generateAddCatsPayload();
    addCats.staffInCharge = "";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Invalid isAdopted - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.isAdopted = "0";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  }); 

  it("No isAdopted - 400", async () => {
    const invalidAddCats: any = generateAddCatsPayload();
    invalidAddCats.isAdopted = undefined;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(invalidAddCats);

    addCatsResponse.status.should.equal(400);
  });

  //BUG: https://github.com/Espositosole/api-automation-training/issues/9
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("Invalid staffInCharge Id - 404", async () => {
    const addCats = generateAddCatsPayload();
    addCats.staffInCharge = "00000000-0000-0000-0000-000000000000";
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(404);
  });

  it("Invalid adopterId - 400", async () => {
    const addCats = generateAddCatsPayload();
    addCats.adopterId = -1;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(400);
  });

  it("Non existent adopterId - 404", async () => {  
    const addCats = generateAddCatsPayload();
    addCats.isAdopted = true;
    addCats.adopterId = 99999999;
    const addCatsResponse = await catsService.addCats<ErrorResponse>(addCats);

    addCatsResponse.status.should.equal(404);
  });
});
