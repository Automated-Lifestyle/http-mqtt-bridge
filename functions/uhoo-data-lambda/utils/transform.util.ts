export const transformData = (
  data: any,
  deviceId: string
): { name: string; value: any }[] => {
  const transformedData: { name: string; value: any }[] = [];
  data.forEach((item: { [x: string]: any }) => {
    for (const key in item) {
      transformedData.push({ name: `${deviceId}_${key}`, value: item[key] });
    }
  });
  return transformedData;
};
