import { AddAdoptersModel } from "../../models/request/AddAdoptersModel"

export const generateAddAdoptersPayload =  (
  name = "Matias",
  lastName = "Castello",
  dateOfBirth = "1995-04-24",
  phone = "098408597",
  address = "Victor Solino 349"
): AddAdoptersModel => {
  return {
    name,
    lastName,
    dateOfBirth,
    phone,
    address,
  } as AddAdoptersModel;
};