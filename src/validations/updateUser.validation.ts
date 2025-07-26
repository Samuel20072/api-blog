export function validateUpdateUserData(data: any) {
  const { name, email, password } = data;

  if (!name && !email && !password) {
    throw new Error('No se proporcionaron datos para actualizar');
  }

  const fieldsToUpdate: string[] = [];
  const values: any[] = [];

  if (name) {
    fieldsToUpdate.push('name = ?');
    values.push(name);
  }

  if (email) {
    fieldsToUpdate.push('email = ?');
    values.push(email);
  }

  return { fieldsToUpdate, values, password };
}
