export async function retryUntilSuccess<T>(
  fn: () => Promise<{ status: number; data: T }>,
  maxRetries = 5,
  delayMs = 2000
): Promise<{ status: number; data: T }> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fn();
    if (response.status !== 500) return response;

    if (attempt < maxRetries) {
      console.warn(`Attempt ${attempt} failed with 500. Retrying...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw new Error(`Request failed with 500 after ${maxRetries} attempts.`);
}
