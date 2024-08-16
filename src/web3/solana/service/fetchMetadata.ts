export async function fetchMetadata(uri: string) {
  const response = await fetch(uri);

  return response.json();
}
