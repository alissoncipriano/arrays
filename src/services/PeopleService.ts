import { Person } from '@src/constants/types';
import BaseService from './BaseService';

class PeopleService {
  people: Person[] = [];

  async setPeople() {
    const response = await BaseService.fetchData();

    const treatedResponse = response.data.results.map((item, index) => {
      return {
        id: index,
        picture: item.picture.thumbnail,
        name: `${item.name.first} ${item.name.last}`,
        email: item.email,
        phone: item.phone,
        age: item.dob.age,
        nat: item.nat,
        gender: item.gender === 'female' ? 'feminino' : 'masculino',
      };
    });

    // console.log(this.getPeople());

    this.people = treatedResponse;
    return treatedResponse;
  }

  getPeople() {
    return this.people;
  }
}

export default PeopleService;
