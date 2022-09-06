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

export type filtersType = {
  gender: {
    selected: boolean;
    value: string;
  };
  age: {
    selected: boolean;
    value: string;
  };
  nationality: {
    selected: boolean;
    value: string;
  };
  searchByName: {
    selected: boolean;
    value: string;
  };
};
