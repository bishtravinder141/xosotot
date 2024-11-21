export class BadRequestError extends Error {}

export class UnauthorizedError extends Error {}

export async function except<T>(promise: Promise<T>) {
  return promise.catch((error: unknown) => {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: void 0 };
  });
}
