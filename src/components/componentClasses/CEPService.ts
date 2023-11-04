const CEPService = {
  get: async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return err;
      }
    }
  },
};

export default CEPService;
