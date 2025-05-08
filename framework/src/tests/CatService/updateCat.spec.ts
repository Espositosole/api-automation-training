import { AdoptersModel } from "../../models/request/AdoptersModel.js";
import { CatsModel } from "../../models/request/CatsModel.js";
import { AdoptersService } from "../../models/services/AdoptersService.js";
import { CatsService } from "../../models/services/CatsService.js";
import { generateAddAdoptersPayload, generateAddCatsPayload } from "../../utils/generate-payloads.js";

describe("Update Cat", () => {
  let catsService: CatsService;
  let adoptersService: AdoptersService;
  let catId: number;
  let adopterId: number;
  const addCats = generateAddCatsPayload();
  const addAdopters = generateAddAdoptersPayload();

  before(async () => {
    adoptersService = new AdoptersService();
    const addAdoptersResponse = await adoptersService.addAdopters<AdoptersModel>(addAdopters);
    adopterId = addAdoptersResponse.data.id as number;
    await new Promise(resolve => setTimeout(resolve, 2000));

    catsService = new CatsService();
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);
    catId = addCatsResponse.data.id as number;
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  //BUG: https://github.com/Espositosole/api-automation-training/issues/11
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("Update cat- 200", async () => {
    const updatedCat = {
      ...addCats,
      name: "Updated Cat",
      age: 1,
      breed: "Siamese",
      dateJoined: "2025-05-04",
      vaccinated: false,
      temperament: ["Dominant"],
      staffInCharge: "00000000-0000-0000-0000-000000000000",
      isAdopted: true,
      adopterId: adopterId,
    };

    const updatedCatResponse = await catsService.updateCatById<CatsModel>(catId, updatedCat);

    updatedCatResponse.status.should.equal(200);
    updatedCatResponse.data.should.have.property("id", catId);
    updatedCatResponse.data.should.have.property("name", updatedCat.name);
    updatedCatResponse.data.should.have.property("age", updatedCat.age);
    updatedCatResponse.data.should.have.property("breed", updatedCat.breed);
    updatedCatResponse.data.should.have.property("dateJoined");
    updatedCatResponse.data.should.have.property("vaccinated", updatedCat.vaccinated);
    updatedCatResponse.data.should.have
      .property("temperament")
      .that.is.an("array")
      .that.includes.members(updatedCat.temperament);
    updatedCatResponse.data.should.have.property("staffInCharge", updatedCat.staffInCharge);
    updatedCatResponse.data.should.have.property("isAdopted", updatedCat.isAdopted);
    updatedCatResponse.data.should.have.property("adopterId", updatedCat.adopterId);
  });

  it("Invalid Id - 404", async () => {
    const updatedCat = {
      ...addCats,
      name: "Updated Cat",
      age: 1,
      breed: "Siamese",
      dateJoined: "2025-05-04",
      vaccinated: false,
      temperament: ["Dominant"],
      staffInCharge: "00000000-0000-0000-0000-000000000000",
      isAdopted: true,
      adopterId: adopterId,
    };

    const updatedCatResponse = await catsService.updateCatById<CatsModel>(-1, updatedCat);
    updatedCatResponse.status.should.equal(404);
  });
});
