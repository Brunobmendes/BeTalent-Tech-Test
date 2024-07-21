import vine from '@vinejs/vine'

export const createCustomerValidator = vine.compile(
  vine.object({
    fullname: vine.string(),
    birth: vine.date(),
    cpf: vine.string(),
    phone: vine.string(),
    address: vine.object({
      street_address: vine.string(),
      address_line_2: vine.string().optional(),
      city: vine.string(),
      state: vine.string(),
      postal_code: vine.string(),
      country: vine.string(),
    }),
  })
)

export const updateCustomerValidator = vine.compile(
  vine.object({
    fullname: vine.string().optional(),
    birth: vine.date().optional(),
    cpf: vine.string().optional(),
  })
)
