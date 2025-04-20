const allStudentAdapter = async (): Promise<any> => {
    try {
      
  
    } catch (err: any) {
      throw {
        message: err?.response?.data || err?.data || "Error desconocido en allStudentAdapter",
        status: err?.response?.status || err?.status || 500
      };
    }
  };
  
  export default {
    allStudentAdapter
  };