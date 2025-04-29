import { AdoptersModel } from "../models/request/AdoptersModel";

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
