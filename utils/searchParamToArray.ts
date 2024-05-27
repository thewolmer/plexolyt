export function searchParamsToArray(param: string | string[] | undefined): string[] {
  if (!param) return [];
  return Array.isArray(param) ? param : param.split(',');
}
