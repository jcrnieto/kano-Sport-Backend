import { Request, Response } from 'express';
import studentAdapter from '../adapter/student.adapter'; 

export const allStudentController = async (req: Request, res: Response): Promise<void> => {
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

export const createStudentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = await studentAdapter.createStudentAdapter(req.body);
    res.status(201).json(value); 
  } catch (err: any) {
    console.error('Error en createStudentController:', err);

    res.status(err.status || 500).json({
      error: err.error || 'Error desconocido',
      details: err.details || undefined,
    });
  }
};


export const getStudentByDniController = async ( req: Request, res: Response): Promise<any> => {
    try {
      const dni = req.query.dni as string;
  
      if (!dni) {
        return res.status(400).json({ error: 'DNI no proporcionado' });
      }
  
      const student = await studentAdapter.byDniStudentAdapter(dni);
      return res.status(200).json(student);
    } catch (error: any) {
      return res.status(error.status || 500).json({
        error: 'Error al buscar estudiante por DNI',
        details: error.message,
      });
    }
  };




  