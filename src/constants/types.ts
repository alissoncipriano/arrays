export type Person = {
  id: number;
  picture: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  nat: string;
  gender: 'feminino' | 'masculino';
};

export type Data = {
  people: Person[];
  nationalities: String[];
};
