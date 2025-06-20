export async function fetchConversion(from, to) {
  try {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`);
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar taxa de câmbio:", error);
    return null;
  }
}