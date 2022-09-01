import { Data } from '@src/constants/types';
import PeopleService from '../services/PeopleService';

class Table extends PeopleService {
  data: Data = {
    people: [],
    nationalities: [],
  };

  async setData() {
    const people = await this.setPeople();
    const nationalities = people
      .map((p) => p.nat)
      .filter(function (value, index, array) {
        return array.indexOf(value) === index;
      });

    this.data = { people: people, nationalities: nationalities };
  }

  getData() {
    return this.data;
  }

  getNat() {
    return this.data.nationalities;
  }
}

export default new Table();
