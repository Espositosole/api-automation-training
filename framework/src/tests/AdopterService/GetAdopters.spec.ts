import { AdoptersModel } from "../../models/request/AdoptersModel.ts";
import { AdoptersService } from "../../models/services/AdoptersService.ts";

describe("Get Adopters", () => {
  let adoptersService: AdoptersService;

  before(() => {
    adoptersService = new AdoptersService();
  });

  it("Success test - 200", async () => {
    const getAdoptersResponse = await adoptersService.getAdopters<AdoptersModel>();

    getAdoptersResponse.status.should.equal(200);
    getAdoptersResponse.data.should.be.an("array");
  });
});
