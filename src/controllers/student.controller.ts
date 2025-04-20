import { Request, Response, NextFunction } from 'express';
import studentAdapter from '../adapter/student.adapter'; 

const allCarsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = await studentAdapter.allStudentAdapter();
    res.status(200).json(value);
  } catch (err: any) {
    console.error('Error en allStudentController:', err);
    res.status(err.status || 500).json({
      error: 'Error al obtener alumnos',
      details: err.message || 'Ocurrió un error desconocido',
    });
  }
};

const createCarsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const value = await studentAdapter.createStudentAdapter(req.body);
      res.status(200).json(value);
    } catch (err: any) {
      console.error('Error en allStudentController:', err);
      res.status(err.status || 500).json({
        error: 'Error al crear alumnos',
        details: err.message || 'Ocurrió un error desconocido',
      });
    }
  };


export default {
    allCarsController,
    createCarsController
};

  