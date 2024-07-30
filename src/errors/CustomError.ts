export class CustomError extends Error {

  statusCode: number

  constructor ({statusCode, message}) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype);
    this.name = 'Shit happend'
    this.statusCode = statusCode
  }
}