import { CatsModel } from "../../models/request/CatsModel.js";
import { CatsService } from "../../models/services/CatsService.js";

// eslint-disable-next-line ui-testing/no-focused-tests
describe.only("Get Cats", () => {
  let catsService: CatsService;

  before(() => {
    catsService = new CatsService();
  });

  it("Success test - 200", async () => {
    const getCatsResponse = await catsService.getCats<CatsModel>(1);

    getCatsResponse.status.should.equal(200);
    getCatsResponse.data.should.have.property("id", 1);
    getCatsResponse.data.should.have.property("name");
    getCatsResponse.data.should.have.property("age");
    getCatsResponse.data.should.have.property("breed");
    getCatsResponse.data.should.have.property("dateJoined");
    getCatsResponse.data.should.have.property("vaccinated");
    getCatsResponse.data.should.have.property("temperament");
    getCatsResponse.data.should.have.property("staffInCharge");
  });

});