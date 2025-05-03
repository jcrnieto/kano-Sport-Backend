import Quota from '../models/Quota';

interface CreateQuotaDTO {
  student_id: number;
  paymentDate: string; 
  expirationDate: string; 
  amount: number;
}

export const createQuotaAdapter = async (data: CreateQuotaDTO): Promise<any> => {
    try {
        const { student_id, paymentDate, expirationDate, amount } = data;

    if (!student_id || !paymentDate || !expirationDate || !amount) {
      throw {
        status: 400,
        message: 'Faltan datos obligatorios para crear la cuota',
      };
    }

    const newQuota = await Quota.create({
      student_id,
      paymentDate: new Date(paymentDate),
      expirationDate: new Date(expirationDate),
      amount
    });

    return {
      message: 'Cuota creada correctamente',
      data: newQuota
    };
    } catch (err: any) {
        throw {
            message: err?.message || 'Error desconocido en createQuotaAdapter',
            status: err?.status || 500
        };
    }
};