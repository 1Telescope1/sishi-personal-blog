// 将原生sql查询出来的字段下划线转成小驼峰
export default function transformData(result:any) {
  const transformedResult = result.map((row: any) => {
    const transformedRow: any = {};
    for (const key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        const transformedKey = snakeToCamel(key);
        transformedRow[transformedKey] = row[key];
      }
    }
    return transformedRow;
  });
  return transformedResult;
}
function snakeToCamel(str: string) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}