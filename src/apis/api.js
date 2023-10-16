import axios from "axios";

const BASE_URL = "http://13.231.17.170:8080";

const apiService = {
  fetchTableFields: async (tablename) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getTableFields?tablename=${tablename}`
      );
      return response.data.data.filter((item) => item.Field !== "iSN");
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Unable to fetch data from the API");
    }
  },
  submitData: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/test/submit`, payload);
      return response.data;
    } catch (error) {
      console.error("Error submitting data:", error);
      throw new Error("Unable to submit data to the API");
    }
  },
};

export default apiService;
