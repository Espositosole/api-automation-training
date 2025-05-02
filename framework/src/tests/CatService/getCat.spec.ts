import { should } from "chai";
import { CatsModel } from "../../models/request/CatsModel.js";
import { CatsService } from "../../models/services/CatsService.js";
import { generateAddCatsPayload } from "../../utils/generate-payloads.js";

describe("Get Cats", () => {
  let catsService: CatsService;
  let catId: number;
  const addCats = generateAddCatsPayload();

  before(() => {
    catsService = new CatsService();
  });

  it("Success test no parameters - 200", async () => {
    const addCatsResponse = await catsService.addCats<CatsModel>(addCats);
    catId = addCatsResponse.data.id ?? -1;

    const getCatsResponse = await catsService.getCats<CatsModel>({
    })
    getCatsResponse.status.should.equal(200);
    const cats = getCatsResponse.data as unknown as CatsModel[];
    const matchedCat = cats.find(cat => cat.id === catId)

    should().exist(matchedCat);

    matchedCat!.should.have.property("id");
    matchedCat!.should.have.property("name", addCats.name);
    matchedCat!.should.have.property("age");
    matchedCat!.should.have.property("breed");
    matchedCat!.should.have.property("dateJoined");
    matchedCat!.should.have.property("vaccinated");
    matchedCat!.should.have.property("temperament");
    matchedCat!.should.have.property("staffInCharge");
  });

  
  it("Success test with parameters - 200", async () => {
    const addCats = generateAddCatsPayload();
    addCats.isAdopted = true;
    addCats.adopterId = 1;
    const createdCat = await catsService.addCats<CatsModel>(addCats);
    catId = createdCat.data.id ?? -1;
  
    const getCatsResponse = await catsService.getCats<CatsModel>({
      isAdopted: true,
      temperaments: "Calm",
    });
    getCatsResponse.status.should.equal(200);
    const cats = getCatsResponse.data as unknown as CatsModel[];
    const matchedCat = cats.find(cat => cat.id === catId)

    should().exist(matchedCat);
    matchedCat!.should.have.property("id");
    matchedCat!.should.have.property("name", addCats.name);
    matchedCat!.should.have.property("isAdopted", true);
    matchedCat!.should.have.property("temperament").that.is.an("array");
  });


  it("Success test with multiple temperaments - 200", async () => {
    const addCats = generateAddCatsPayload();
    addCats.isAdopted = true;
    addCats.adopterId = 1;
    addCats.temperament = ["Dominant", "Playful"];
    const createdCat = await catsService.addCats<CatsModel>(addCats);
    catId = createdCat.data.id ?? -1;
  
    const getCatsResponse = await catsService.getCats<CatsModel>({
      isAdopted: true,
      temperaments: ["Dominant", "Playful"],
    });
    getCatsResponse.status.should.equal(200);
    const cats = getCatsResponse.data as unknown as CatsModel[];
    const matchedCat = cats.find(cat => cat.id === catId)

    should().exist(matchedCat);
    matchedCat!.should.have.property("id");
    matchedCat!.should.have.property("name", addCats.name);
    matchedCat!.should.have.property("isAdopted", true);
    matchedCat!.should.have.property("temperament").that.is.an("array");
  }); 

});