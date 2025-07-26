import Joi from 'joi';

export const createArticleSchema = Joi.object({
  title: Joi.string().max(200).required().messages({
    'string.empty': 'El título es obligatorio',
    'string.max': 'El título no puede superar los 200 caracteres',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'El contenido es obligatorio',
  }),
 imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'La URL de la imagen debe ser válida',
  }),
});

export const updateArticleSchema = Joi.object({
  title: Joi.string().max(200).optional().messages({
    'string.max': 'El título no puede superar los 200 caracteres',
  }),
  content: Joi.string().optional().messages({
    'string.empty': 'El contenido no puede estar vacío',
  }),
  imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'La URL de la imagen debe ser válida',
  }),
});

