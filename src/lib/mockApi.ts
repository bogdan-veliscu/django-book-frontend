export const mockApi = {
  get: async (url: string) => {
    console.log(`Mocking API call to: ${url}`);
    return { data: [] };
  }
}; 