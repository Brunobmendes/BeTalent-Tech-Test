import vine from '@vinejs/vine'

export const createCostumerValidator = vine.compile(
  vine.object({
    fullname: vine.string(),
    birth: vine.date(),
    cpf: vine.string(),
    phone: vine.string(),
    address: vine.object({
      streetAddress: vine.string(),
      addressLine2: vine.string().optional(),
      city: vine.string(),
      state: vine.string(),
      postalCode: vine.string(),
      country: vine.string(),
    }),
  })
)
