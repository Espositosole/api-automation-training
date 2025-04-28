import { AdoptersService } from "../models/services/AdoptersService.ts";
import { AddAdoptersResponse } from "../models/responses/AddAdoptersResponse";

describe("Get Adopters", () => {
  let adoptersService: AdoptersService;

  before(() => {
    adoptersService = new AdoptersService();
  });

  it("Success test - 200", async () => {
    const getAdoptersResponse = await adoptersService.getAdopters<AddAdoptersResponse>();

    getAdoptersResponse.status.should.equal(200);
    getAdoptersResponse.data.should.be.an("array");
  });
});
