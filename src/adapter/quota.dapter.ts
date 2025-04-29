import Quota from '../models/Quota';

interface CreateQuotaDTO {
    alumno_id: number;
    fechaPago: string; 
    fechaVencimiento: string; 
    monto: number;
}

export const createQuotaAdapter = async (data: CreateQuotaDTO): Promise<any> => {
    try {
        const { alumno_id, fechaPago, fechaVencimiento, monto } = data;

    if (!alumno_id || !fechaPago || !fechaVencimiento || !monto) {
      throw {
        status: 400,
        message: 'Faltan datos obligatorios para crear la cuota',
      };
    }

    const newQuota = await Quota.create({
      alumno_id,
      fechaPago: new Date(fechaPago),
      fechaVencimiento: new Date(fechaVencimiento),
      monto
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