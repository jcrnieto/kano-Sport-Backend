import { Request, Response } from 'express';
import { createQuotaAdapter } from '../adapter/quota.dapter';

export const createQuotaController = async (req: Request, res: Response): Promise<void> => {
    try {
          const value = await createQuotaAdapter(req.body);
          res.status(200).json(value);
        } catch (err: any) {
          console.error('Error en createQuotaController:', err);
          res.status(err.status || 500).json({
            error: 'Error al crear cuota',
            details: err.message || 'Ocurrió un error desconocido',
          });
        }                    
}