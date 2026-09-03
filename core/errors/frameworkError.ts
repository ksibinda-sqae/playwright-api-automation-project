export class FrameworkError extends Error {
  public readonly timestamp: Date;

  public readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'FrameworkError';
    this.timestamp = new Date();
    this.cause = cause;
  }
}
