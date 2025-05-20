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


export const getStudentByDniController = async (req: Request, res: Response): Promise<any> => {
  try {
    const dni = req.query.dni;

    if (typeof dni !== 'string' || dni.trim() === '') {
      return res.status(400).json({ error: 'DNI no proporcionado o inválido' });
    }

    const student = await studentAdapter.byDniStudentAdapter(dni.trim());
    return res.status(200).json(student);

  } catch (error: any) {
    return res.status(error.status || 500).json({
      error: 'Error al buscar estudiante por DNI',
      details: error.message,
    });
  }
};

export const getStudentByIdController = async ( req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.query.id as string, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: 'id inválido' });
      }
    
      if (!id) {
        return res.status(400).json({ error: 'id no proporcionado' });
      }
  
      const student = await studentAdapter.byIdStudentAdapter(id);
      return res.status(200).json(student);
    } catch (error: any) {
      return res.status(error.status || 500).json({
        error: 'Error al buscar estudiante por id',
        details: error.message,
      });
    }
};


export const deleteStudentByIdController = async ( req: Request, res: Response): Promise<any> => {
  try {
    const deleteId = parseInt(req.query.deleteId as string, 10);

    if (isNaN(deleteId)) {
      return res.status(400).json({ error: 'id inválido' });
    }
  
    if (!deleteId) {
      return res.status(400).json({ error: 'id no proporcionado' });
    }

    const student = await studentAdapter.deleteByIdStudentAdapter(deleteId);
    return res.status(200).json(student);
  } catch (error: any) {
    return res.status(error.status || 500).json({
      error: 'Error al eliminar estudiante por id',
      details: error.message,
    });
  }
};

export const modificationStudentByIdController = async ( req: Request, res: Response): Promise<any> => {
  try {
    const payload = { id: parseInt(req.params.id, 10), ...req.body };
    const result = await studentAdapter.modificationStudentAdapter(payload);
    res.status(200).json(result); 
  } catch (error: any) {
    return res.status(error.status || 500).json({
      error: 'Error al modificar estudiante por id',
      details: error.message,
    });
  }
};


export const getStudentByNameController = async ( req: Request, res: Response): Promise<any> => {
    try {
      const name = req.query.name as string;

      if (!name) {
        return res.status(400).json({ error: 'name no proporcionado' });
      }
  
      const student = await studentAdapter.byNameStudentAdapter(name);
      return res.status(200).json(student);
    } catch (error: any) {
      return res.status(error.status || 500).json({
        error: 'Error al buscar estudiante por nombre',
        details: error.message,
      });
    }
};

  