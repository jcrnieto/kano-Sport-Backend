import { z } from 'zod';
import { ZodError } from 'zod';

import Student from '../models/Student';
import Quota from '../models/Quota';

const allStudentAdapter = async (): Promise<any> => {
    try {
        const students = await Student.findAll();
        return {
          message: 'Alumnos obtenidos correctamente',
          data: students,
        };
  
    } catch (err: any) {
      throw {
        message: err?.response?.data || err?.data || "Error desconocido en allStudentAdapter",
        status: err?.response?.status || err?.status || 500
      };
    }
};


// Esquema de validación
const CreateStudentSchema = z.object({
    dni: z.string(),
    name: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string().optional(),
    phone: z.string(),
    address: z.string(), 
  });
  
// Tipado inferido automáticamente
type CreateStudentPayload = z.infer<typeof CreateStudentSchema>;

const createStudentAdapter = async (data: unknown): Promise<any> => {
try {
    // Validamos el input
    const parsedData = CreateStudentSchema.parse(data);

    // Verificar si el DNI ya existe
    const existingStudent = await Student.findOne({ where: { dni: parsedData.dni } });
    if (existingStudent) {
      throw {
        custom: true,  // agregamos una marca propia
        message: 'Ya existe un estudiante con este DNI',
        status: 409,   // 409 Conflict
      };
    }

    console.log('Estoy en adapter con data validada:', parsedData);
    // Guardamos en la base de datos
    const newStudent = await Student.create({
    dni: parsedData.dni,
    name: parsedData.name,
    lastName: parsedData.lastName,
    dateOfBirth: parsedData.dateOfBirth
    ? new Date(parsedData.dateOfBirth)
    : undefined,
    phone: parsedData.phone,
    address: parsedData.address
    });
    

    return {
    message: 'Estudiante creado correctamente',
    data: newStudent, 
    };
  } catch (err: any) {
    if (err instanceof ZodError) {
      // Error de validación
      throw {
        error: 'Datos enviados no válidos',
        details: err.errors,
        status: 400,
      };
    } else if (err.custom) {
      // Error manual (como DNI duplicado)
      throw {
        error: err.message,
        status: err.status,
      };
    } else {
      // Error interno inesperado
      console.error('Error inesperado en createStudentAdapter:', err);
      throw {
        error: 'Error interno al crear estudiante',
        status: 500,
      };
    }
  }
};


const byDniStudentAdapter = async (dni: string): Promise<any> => {
    try {
      const student = await Student.findOne({
        where: { dni },
        include: [
          {
            model: Quota,
            attributes: ['id', 'paymentDate', 'expirationDate', 'amount'],
          },
        ],
      });
      
      if (!student) {
        throw {
          message: `No se encontró un estudiante con el DNI ${dni}`,
          status: 404
        };
      }
  
      return {
        message: 'Estudiante encontrado',
        data: student,
      };
      
    } catch (err: any) {
      throw {
        message: err?.message || 'Error desconocido en byDniStudentAdapter',
        status: err?.status || 500
      };
    }
};

const byIdStudentAdapter = async (id: number): Promise<any> => {
  try {
    const student = await Student.findByPk(id, {
      include: [
        {
          model: Quota,
          attributes: ['id', 'paymentDate', 'expirationDate', 'amount'],
        },
      ],
    });

    if (!student) {
      throw {
        message: `No se encontró un estudiante con el id ${id}`,
        status: 404
      };
    }

    return {
      message: 'Estudiante encontrado',
      data: student,
    };
    
  } catch (err: any) {
    throw {
      message: err?.message || 'Error desconocido en byIdStudentAdapter',
      status: err?.status || 500
    };
  }
};
  
  
export default {
    allStudentAdapter,
    createStudentAdapter,
    byDniStudentAdapter,
    byIdStudentAdapter
};