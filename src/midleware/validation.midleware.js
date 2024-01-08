import { Types } from "mongoose"



export const validation = (schema) => {
  return (req, res, next) => {
    const data = {...req.body, ...req.header,...req.params}
    const validate = schema.validate(data, { abortEarly: false })
    if (validate.error) {
      const ErrorMessage = validate.error.details.map((obj) => {
        return obj.message
      })
      return next(new Error(ErrorMessage))
    }

    return next();
  }

}
export const objectIdValidation = (value, helper) => {
  if(Types.ObjectId.isValid(value)) return true
  return helper.message("invalid object id")
}
