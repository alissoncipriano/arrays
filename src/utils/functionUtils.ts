import Table from '../models/Table';

async function fetchTableData() {
  try {
    await Table.setData();
  } catch (error) {
    console.error('Erro ao acessar API de pessoas: ', error);
  }
}

export { fetchTableData };
