export class ContentError extends Error {
  constructor(
    message: string,
    readonly status: number | null = null,
    readonly path?: string,
  ) {
    super(message)
    this.name = 'ContentError'
  }
}

export function isNotFound(error: unknown): boolean {
  return error instanceof ContentError && error.status === 404
}
