const API_URL = 'https://brasilapi.com.br/api/banks/v1/';

export const obterListaDeBancos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao obter dados da API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao chamar a API externa:', error);
    throw error;
  }
};
