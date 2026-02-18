export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", {
      cause: cause,
    });

    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
      message: this.message,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");

    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o método HTTP utilizado é permitido para este endpoint.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
      message: this.message,
    };
  }
}
