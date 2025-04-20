import { Request, Response, NextFunction } from 'express';
import studentAdapter from '../adapter/student.adapter'; 

const allCarsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const value = await studentAdapter.allStudentAdapter();
    res.status(200).json(value);
  } catch (err: any) {
    console.error('Error en allCarsController:', err);
    res.status(err.status || 500).json({
      error: 'Error al obtener los autos',
      details: err.message || 'Ocurrió un error desconocido',
    });
  }
};

export default allCarsController;

  