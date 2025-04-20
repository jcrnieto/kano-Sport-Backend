import { z } from 'zod';

import Student from '../models/Student';

const allStudentAdapter = async (): Promise<any> => {
    try {
      console.log('estoy en adapters')
  
    } catch (err: any) {
      throw {
        message: err?.response?.data || err?.data || "Error desconocido en allStudentAdapter",
        status: err?.response?.status || err?.status || 500
      };
    }
  };

  // Esquema de validación
const CreateStudentSchema = z.object({
    id: z.number(),
    dni: z.string(),
    nombre: z.string(),
    apellido: z.string(),
    fecha_nacimiento: z.string().optional(), // o z.coerce.date() si querés convertirlo a Date
  });
  
  // Tipado inferido automáticamente
  type CreateStudentPayload = z.infer<typeof CreateStudentSchema>;
  
  const createStudentAdapter = async (data: unknown): Promise<any> => {
    try {
      // Validamos el input
      const parsedData = CreateStudentSchema.parse(data);
  
      console.log('Estoy en adapter con data validada:', parsedData);
       // Guardamos en la base de datos
      const newStudent = await Student.create({
        dni: parsedData.dni,
        nombre: parsedData.nombre,
        apellido: parsedData.apellido,
        fecha_nacimiento: parsedData.fecha_nacimiento
        ? new Date(parsedData.fecha_nacimiento)
        : undefined,
      });
      
  
      return {
        message: 'Estudiante creado correctamente',
        data: newStudent, 
      };
    } catch (err: any) {
        throw {
          message: 'Payload inválido: ' + err.message,
          status: 400
        };
      }
  };
  
  
export default {
    allStudentAdapter,
    createStudentAdapter
  };