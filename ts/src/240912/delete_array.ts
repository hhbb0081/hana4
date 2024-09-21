type TPropertyKeyType = string | number | symbol;
type TUser3 = { [key: string]: string | number };

function deleteArray(
  arr: TUser3[] | number[],
  startOrKey: TPropertyKeyType,
  endOrValue?: unknown
) {
  if (typeof startOrKey === "number") {
    if (typeof endOrValue === "number") {
      return arr.filter((_, i) => i < startOrKey || i > endOrValue - 1);
    }
    return arr.slice(0, startOrKey);
  }

  if (typeof startOrKey === "string") {
    arr.filter((e) => {
      if (e && typeof e === "object") {
        // e['id'];  error
        // e[startOrKey];  error
      }
    });
  }

  if (typeof startOrKey === "symbol") {
  }

  return [];
}
