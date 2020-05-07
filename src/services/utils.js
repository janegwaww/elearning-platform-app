// 数组管
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

// 字符转对象
export const strToObj = k => ({ [k]: "" });

// 转换为驼峰命名
export const wrapCamelName = (str = "") =>
  str
    .split("_")
    .map((o, i) => (i > 0 ? o.replace(/^./, s => s.toUpperCase()) : o))
    .join("");
