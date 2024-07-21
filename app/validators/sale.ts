import { SaleStatus } from '#models/enums/sale_enum'
import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    customerId: vine.number(),
    productId: vine.number(),
    quantity: vine.number(),
    unitPrice: vine.number(),
    totalPrice: vine.number(),
    status: vine.enum(SaleStatus),
  })
)

export const udpateSaleValidator = vine.compile(
  vine.object({
    customerId: vine.number().optional(),
    productId: vine.number().optional(),
    quantity: vine.number().optional(),
    unitPrice: vine.number().optional(),
    totalPrice: vine.number().optional(),
    status: vine.enum(SaleStatus).optional(),
  })
)
