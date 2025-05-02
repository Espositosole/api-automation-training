import { CatsModel } from "../../models/request/CatsModel.js";
import { CatsService } from "../../models/services/CatsService.js";
import { generateAddCatsPayload } from "../../utils/generate-payloads.js";

describe("Get Cat by Id", () => {
  let catsService: CatsService;
  let catId: number;
  const addCats = generateAddCatsPayload();

  before(() => {
    catsService = new CatsService();
  });

  it("Success test - 200", async () => {
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);
    catId = addCatsResponse.data.id ?? -1;

    const getCatByIdResponse = await catsService.getCatById<CatsModel>(catId);
    getCatByIdResponse.status.should.equal(200);
    getCatByIdResponse.data.should.have.property("id", catId);
    getCatByIdResponse.data.should.have.property("name", addCats.name);
    getCatByIdResponse.data.should.have.property("age", addCats.age);
    getCatByIdResponse.data.should.have.property("breed", addCats.breed);
    getCatByIdResponse.data.should.have.property("dateJoined");
    getCatByIdResponse.data.should.have.property("vaccinated", addCats.vaccinated);
    getCatByIdResponse.data.should.have.property("temperament");
    getCatByIdResponse.data.should.have.property("staffInCharge", addCats.staffInCharge);
  });
});