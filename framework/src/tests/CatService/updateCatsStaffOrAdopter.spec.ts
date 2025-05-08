import { CatsModel } from "../../models/request/CatsModel.js";
import { CatsService } from "../../models/services/CatsService.js";
import { generateAddCatsPayload } from "../../utils/generate-payloads.js";

describe("Update Cats Staff or Adopter", () => {
  let catsService: CatsService;
  let catId: number;
  const addCats = generateAddCatsPayload();
  addCats.isAdopted = true;
  addCats.adopterId = 1;

  before(async () => {
    catsService = new CatsService();
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);
    catId = addCatsResponse.data.id as number;
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  //First need to create a staff member
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("Update cat staff - 200", async () => {
    const updateStaffResponse = await catsService.updateCatsStaffOrAdopter<CatsModel>(catId, {
      staffInCharge: "00000000-0000-0000-0000-000000000001",
    });

    updateStaffResponse.status.should.equal(200);
    updateStaffResponse.data.staffInCharge.should.equal("00000000-0000-0000-0000-000000000001");
  });

  it("Update cat adopter - 200", async () => {
    const updateAdopterResponse = await catsService.updateCatsStaffOrAdopter<CatsModel>(catId, {
      adopterId: 1,
    });

    updateAdopterResponse.status.should.equal(200);
    updateAdopterResponse.data.adopterId?.should.equal(1);
  });

  it("Adopter Id not found - 404", async () => {
    const updateAdopterResponse = await catsService.updateCatsStaffOrAdopter<CatsModel>(-1, {
      adopterId: 1,
    });

    updateAdopterResponse.status.should.equal(404);
  });

  it("Staff Id not found - 404", async () => {
    const updateAdopterResponse = await catsService.updateCatsStaffOrAdopter<CatsModel>(-1, {
      staffInCharge: "00000000-0000-0000-0000-000000000001",
    });

    updateAdopterResponse.status.should.equal(404);
  });

  it("Invalid input - 400", async () => {
    const updateAdopterResponse = await catsService.updateCatsStaffOrAdopter<CatsModel>(catId, {
      adopterId: 0,
    });

    updateAdopterResponse.status.should.equal(400);
  });
});
