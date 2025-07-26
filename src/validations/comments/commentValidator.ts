import Joi from 'joi';

export const createCommentSchema = Joi.object({
  content: Joi.string().required().messages({
    'string.empty': 'El contenido del comentario es obligatorio',
  }),
  articleId: Joi.number().integer().required().messages({
    'any.required': 'El ID del artículo es obligatorio',
    'number.base': 'El ID del artículo debe ser un número entero',
  }),
  userId: Joi.number().integer().required().messages({
    'any.required': 'El ID del usuario es obligatorio',
    'number.base': 'El ID del usuario debe ser un número entero',
  }),
});
