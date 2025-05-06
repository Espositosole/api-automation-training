export async function retryUntilSuccess<T>(
  fn: () => Promise<{ status: number; data: T }>,
  maxRetries = 3,
  delayMs = 1000
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
