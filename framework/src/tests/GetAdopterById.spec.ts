import { AdoptersService } from "../models/services/AdoptersService.ts";
import { type GetAdoptersResponse } from "../models/responses/GetAdoptersResponse.js";
import { AdoptersModel } from "../models/request/AdoptersModel.ts";
import { generateAddAdoptersPayload } from "../utils/generate-payloads.ts";

describe("Get Adopter by Id", () => {
  let adoptersService: AdoptersService;
  let id: number;
  let addAdopters = generateAddAdoptersPayload();

  before(async () => {
    adoptersService = new AdoptersService();
    const addAdoptersResponse = await adoptersService.addAdopters<AdoptersModel>(addAdopters);
    id = addAdoptersResponse.data.id ?? -1;;
  });

  it("Id and param set to true - 200", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<GetAdoptersResponse>(id, {
      includeCat: true,
    });

    getAdopterByIdResponse.status.should.equal(200);
    getAdopterByIdResponse.data.name.should.equal(addAdopters.name);
    getAdopterByIdResponse.data.lastName.should.equal(addAdopters.lastName);
    getAdopterByIdResponse.data.id.should.equal(id);
  });

  it("Id and param set to false - 200", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(id, {
      includeCat: false,
    });

    getAdopterByIdResponse.status.should.equal(200);
  });

  it("Id and param not set - 200", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(id);

    getAdopterByIdResponse.status.should.equal(200);
  });

  it("Invalid Id - 404", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(-1);

    getAdopterByIdResponse.status.should.equal(404);
  });

  it("Invalid Id and param set to true - 404", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(-1, {
      includeCat: true,
    });
    getAdopterByIdResponse.status.should.equal(404);
  });

  it("Invalid Id and param set to false - 404", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AdoptersModel>(-1, {
      includeCat: false,
    });
    getAdopterByIdResponse.status.should.equal(404);
  });
});
