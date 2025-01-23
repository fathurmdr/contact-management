export function toJSON<T>(data: T): T {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return data;
  }
}
