export interface ApiResponse<T> {
  status: number;
  headers: Record<string, string>;
  ok: boolean;
  body: T;
}
