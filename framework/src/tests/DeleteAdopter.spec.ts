import { AdoptersModel } from "../models/request/AdoptersModel.ts";
import { AdoptersService } from "../models/services/AdoptersService.ts";
import { generateAddAdoptersPayload } from "../utils/generate-payloads.js";

describe("Delete Adopter", () => {
  let adoptersService: AdoptersService;
  let id: number;

  beforeEach(async () => {
    adoptersService = new AdoptersService();
    const addAdopters = generateAddAdoptersPayload();
    const addAdoptersResponse = await adoptersService.addAdopters<AdoptersModel>(addAdopters);
    id = addAdoptersResponse.data.id ?? -1;
  });

  it("Id set - 204", async () => {
    const deleteAdopterResponse = await adoptersService.deleteAdopterById(id);

    deleteAdopterResponse.status.should.equal(204);

    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(id);
    getAdopterByIdResponse.status.should.equal(404);
  });

  it("Invalid Id - 404", async () => {
    const deleteAdopterResponse = await adoptersService.deleteAdopterById(-1);

    deleteAdopterResponse.status.should.equal(404);

    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(id);
    getAdopterByIdResponse.status.should.equal(200);
  });
});
