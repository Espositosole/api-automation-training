import { AddAdoptersResponse } from "../models/responses/AddAdoptersResponse";
import { AdoptersService } from "../models/services/AdoptersService.ts";
import { generateAddAdoptersPayload } from "../utils/constants/generate-payloads.js";
import { type GetAdoptersResponse } from "../models/responses/GetAdoptersResponse.js";

describe("Get Adopter by Id", () => {
  let adoptersService: AdoptersService;
  let id: number;

  before(async () => {
    adoptersService = new AdoptersService();
    const addAdopters = generateAddAdoptersPayload();
    const addAdoptersResponse = await adoptersService.addAdopters<AddAdoptersResponse>(addAdopters);
    id = addAdoptersResponse.data.id;
  });

  it("Id and param set to true - 200", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<GetAdoptersResponse>(id, {
      includeCat: true,
    });

    getAdopterByIdResponse.status.should.equal(200);
    getAdopterByIdResponse.data.name.should.equal(generateAddAdoptersPayload().name);
    getAdopterByIdResponse.data.lastName.should.equal(generateAddAdoptersPayload().lastName);
    getAdopterByIdResponse.data.id.should.equal(id);
  });

  it("Id and param set to false - 200", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AddAdoptersResponse>(id, {
      includeCat: false,
    });

    getAdopterByIdResponse.status.should.equal(200);
  });

  it("Id and param not set - 200", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AddAdoptersResponse>(id);

    getAdopterByIdResponse.status.should.equal(200);
  });

  it("Invalid Id - 404", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AddAdoptersResponse>(-1);

    getAdopterByIdResponse.status.should.equal(404);
  });

  it("Invalid Id and param set to true - 404", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AddAdoptersResponse>(-1, {
      includeCat: true,
    });
    getAdopterByIdResponse.status.should.equal(404);
  });

  it("Invalid Id and param set to false - 404", async () => {
    const getAdopterByIdResponse = await adoptersService.getAdopterById<AddAdoptersResponse>(-1, {
      includeCat: false,
    });
    getAdopterByIdResponse.status.should.equal(404);
  });
});
