import { z } from 'zod';
import { ZodError } from 'zod';

import { Op } from 'sequelize';

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
    
    const parsedData = CreateStudentSchema.parse(data);

    const existingStudent = await Student.findOne({ where: { dni: parsedData.dni } });
    if (existingStudent) {
      throw {
        custom: true, 
        message: 'Ya existe un estudiante con este DNI',
        status: 409,   
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
          attributes: ['id', 'paymentDate', 'expirationDate', 'amount', 'plan'],
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

const deleteByIdStudentAdapter = async (deleteId: number): Promise<any> => {
  try {
    
    const student = await Student.findByPk(deleteId);

    if (!student) {
      throw {
        message: `No se encontró un estudiante con el ID ${deleteId}`,
        status: 404
      };
    }

    await student.destroy();

    return {
      message: 'Estudiante eliminado exitosamente',
      data: student, 
    };
    
  } catch (err: any) {
    throw {
      message: err?.message || 'Error desconocido en deleteByIdStudentAdapter',
      status: err?.status || 500
    };
  }
};

export const UpdateStudentSchema = z.object({
  id: z.number({
    required_error: 'El id es obligatorio',
    invalid_type_error: 'El id debe ser un número',
  }),
  dni: z.string().optional(),
  name: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const modificationStudentAdapter = async (data: unknown): Promise<any> => {
  try {
    const parsed = UpdateStudentSchema.parse(data);
    const { id, dni, name, lastName, dateOfBirth, phone, address } = parsed;

    const student = await Student.findByPk(id);
    if (!student) {
      throw { message: `No existe un estudiante con id ${id}`, status: 404 };
    }

    // 3. Actualizar solo los campos recibidos
    const updates: Partial<typeof parsed> = {};
    if (dni !== undefined)      updates.dni = dni;
    if (name !== undefined)     updates.name = name;
    if (lastName !== undefined) updates.lastName = lastName;
    if (dateOfBirth !== undefined) updates.dateOfBirth = new Date(dateOfBirth);
    if (phone !== undefined)    updates.phone = phone;
    if (address !== undefined)  updates.address = address;

    await student.update(updates);

    return {
      message: 'Estudiante modificado correctamente',
      data: student,
    };
    } catch (err: any) {
      if (err instanceof ZodError) {
        // errores de validación
        throw {
          error: 'Datos inválidos',
          details: err.errors,
          status: 400,
        };
      } else if (err.status && err.message) {
        // errores personalizados (404, duplicados, etc)
        throw {
          error: err.message,
          status: err.status,
        };
      } else {
        console.error('Error inesperado en modificationStudentAdapter:', err);
        throw {
          error: 'Error interno al modificar estudiante',
          status: 500,
        };
      }
    }  
};

const byNameStudentAdapter = async (name: string): Promise<any> => {
  try {
    const student = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, 
        }
      },
      include: [
        {
          model: Quota,
          attributes: ['id', 'paymentDate', 'expirationDate', 'amount', 'plan'],
        },
      ],
    });

    if (!student) {
      throw {
        message: `No se encontró un estudiante con el nombre "${name}"`,
        status: 404
      };
    }

    return {
      message: 'Estudiante encontrado',
      data: student,
    };

  } catch (err: any) {
    throw {
      message: err?.message || 'Error desconocido en byNameStudentAdapter',
      status: err?.status || 500
    };
  }
};
  
  
export default {
    allStudentAdapter,
    createStudentAdapter,
    byDniStudentAdapter,
    byIdStudentAdapter,
    deleteByIdStudentAdapter,
    modificationStudentAdapter,
    byNameStudentAdapter
};