import { Person } from '../../constants/types';
import Table from '../../models/Table';
import { filterObject } from './constants';

export const handleFilters = {
  update: (
    filters: typeof filterObject,
    operation: string,
    target
  ): typeof filterObject => {
    if (operation === 'nationality' || operation === 'age') {
      const newFilterValue = {
        ...filters[operation],
        selected: true,
        value: target.value as string,
      };

      if (operation === 'nationality')
        return { ...filters, nationality: newFilterValue };
      return { ...filters, age: newFilterValue };
    }

    const newFilterValue = {
      ...filters.gender,
      selected: true,
      value: (target as HTMLInputElement).value,
    };

    return { ...filters, gender: newFilterValue };
  },
  getCase: (filters: typeof filterObject): string => {
    if (
      filters.gender.selected &&
      filters.age.selected &&
      filters.nationality.selected
    )
      return 'all';
    if (filters.gender.selected && filters.age.selected) return 'gender-age';
    if (filters.gender.selected && filters.nationality.selected)
      return 'gender-nationality';
    if (filters.age.selected && filters.nationality.selected)
      return 'age-nationality';
    if (filters.gender.selected) return 'gender';
    if (filters.age.selected) return 'age';
    return 'nationality';
  },
  clean: (): typeof filterObject => {
    return { ...filterObject };
  },
  apply: (filters: typeof filterObject): Person[] => {
    switch (handleFilters.getCase(filters)) {
      case 'all':
        return Table.getPeople().filter(
          (el) =>
            el.gender === filters.gender.value &&
            el.age === Number.parseInt(filters.age.value) &&
            el.nat === filters.nationality.value
        );
      case 'gender-age':
        return Table.getPeople().filter(
          (el) =>
            el.gender === filters.gender.value &&
            el.age === Number.parseInt(filters.age.value)
        );
      case 'gender-nationality':
        return Table.getPeople().filter(
          (el) =>
            el.gender === filters.gender.value &&
            el.nat === filters.nationality.value
        );

      case 'age-nationality':
        return Table.getPeople().filter(
          (el) =>
            el.age === Number.parseInt(filters.age.value) &&
            el.nat === filters.nationality.value
        );
      case 'gender':
        return Table.getPeople().filter(
          (el) => el.gender === filters.gender.value
        );
      case 'age':
        return Table.getPeople().filter(
          (el) => el.age === Number.parseInt(filters.age.value)
        );
      case 'nationality':
        return Table.getPeople().filter(
          (el) => el.nat === filters.nationality.value
        );
    }

    return Table.getPeople();
  },
};
