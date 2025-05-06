export interface PetType {
    id: number;
    name: string;
    value: string;
    image: string;
}

export interface CreatePetType {
  name: string;
  type: string;
  breed: string[];
  gender: string;
  birthdate: string;
  weight: number;
  reproductive: string;
  allergies: string;
  photo: string;
}
