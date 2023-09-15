import { reduce } from "lodash";

export const normalizeRecords = (records: any) => {
    return reduce(
      records,
      (acc: Record<string, any>, values, key) => {
        acc[key] = { key, values };
        return acc;
      },
      {}
    );
  };
  
export const normalizeModifiedRecords = (records: any) => {
    return reduce(
      records,
      (acc: Record<string, any>, value, key) => {
      acc[key]={updated_col_name:value.key,...value?.values};
       // acc[value?.key] = value?.values;
        return acc;
      },
      {}
    );
  };
  