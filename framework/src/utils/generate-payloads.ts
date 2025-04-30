import { AdoptersModel } from "../models/request/AdoptersModel";
import { CatsModel } from "../models/request/CatsModel";

export const generateAddAdoptersPayload = (
  name = `Matias ${Date.now()}`,
  lastName = "Castello",
  dateOfBirth = "1995-04-24",
  phone = "098408597",
  address = "Victor Solino 349",
): AdoptersModel => {
  return {
    name,
    lastName,
    dateOfBirth,
    phone,
    address,
  } as AdoptersModel;
};

export const generateAddCatsPayload = (
  name = `Kitty ${Date.now()}`,
  age = 2,
  breed = "Siamese",
  dateJoined = "2023-10-01",
  vaccinated = true,
  temperament = ["Calm"],
  staffInCharge = "00000000-0000-0000-0000-000000000000",
  isAdopted = false,
  adopterId?: number,
): CatsModel => {
  return {
    name,
    age,
    breed,
    dateJoined,
    vaccinated,
    temperament,
    staffInCharge,
    isAdopted,
    adopterId,
  } as CatsModel;
}