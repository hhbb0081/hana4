export function range(start, end, step = start > end ? -1 : 1) {
  // 예외처리
  if (step === 0 || start === end) return [start];

  if ((start > end && step > 0) || (start < end && step < 0)) return [];

  // # 1
  if (end === undefined) {
    if (start > 0) {
      end = start;
      start = 1;
    } else if (start < 0) {
      end = -1;
    } else {
      end = 0;
    }
  }

  console.log(
    Array.from({ length: end - start + 1 }, (_, i) => start + step * i)
  );
}

Array.prototype.mapBy = function (prop) {
  return this?.map((a) => a[prop]) || [];
};
Array.prototype.filterBy = function (prop, value, isIncludes = false) {
  const cb = isIncludes
    ? (a) => a[prop]?.includes(value)
    : (a) => a[prop] === value;

  return this?.filter(cb) || [];
};
Array.prototype.rejectBy = function (prop, value, isIncludes = false) {
  const cb = isIncludes
    ? (a) => !a[prop]?.includes(value)
    : (a) => a[prop] !== value;

  return this?.filter(cb) || [];
};
Array.prototype.findBy = function (prop, value) {
  return this?.filter((a) => a[prop] === value)[0];
};
Array.prototype.sortBy = function (prop) {
  // name | name:desc | name:asc
  const [k, direction = "asc"] = prop?.split(":");
  const dir = direction?.toLowerCase() === "desc" ? -1 : 1;
  return this?.sort((a, b) => (a[k] > b[k] ? dir : -dir));
};
