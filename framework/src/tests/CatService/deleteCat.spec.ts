import { CatsModel } from "../../models/request/CatsModel.js";
import { CatsService } from "../../models/services/CatsService.js";
import { generateAddCatsPayload } from "../../utils/generate-payloads.js";

describe("Delete Cat by Id", () => {
  let catsService: CatsService;
  let catId: number;
  const addCats = generateAddCatsPayload();

  beforeEach(async () => {
    catsService = new CatsService();
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);
    catId = addCatsResponse.data.id ?? -1;
  });

  it("Success test - 204", async () => {
    const deleteCatByIdResponse = await catsService.deleteCatById(catId);
    deleteCatByIdResponse.status.should.equal(204);

    const getCatByIdResponse = await catsService.getCatById<CatsModel>(catId);
    getCatByIdResponse.status.should.equal(404);
  });

  it("Invalid Id - 404", async () => {
    const deleteCatByIdResponse = await catsService.deleteCatById(-1);
    deleteCatByIdResponse.status.should.equal(404);

    const getCatByIdResponse = await catsService.getCatById<CatsModel>(catId);
    getCatByIdResponse.status.should.equal(200);
  });
});
