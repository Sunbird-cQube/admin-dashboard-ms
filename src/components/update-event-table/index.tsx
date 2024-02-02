import { normalizeModifiedRecords, normalizeRecords } from "@/utils";
import { map, omit, filter } from "lodash";
import React, { FC, useCallback, useState } from "react";
import {
  Checkbox,
  IconButton
} from "@material-tailwind/react";
import swal from "sweetalert";
import { BsXLg, BsFillTrashFill } from "react-icons/bs";

const UpdateEventTable: FC<any> = ({ data, onUpdate }) => {
  const [records, setRecords] = useState(normalizeRecords(data));
  const [programName, setProgramName] = useState('');
  const [programDesc, setProgramDesc] = useState('');
  const [categories, setCategories] = useState<any>([]);
  const [dimensions, setDimensions] = useState<any>([]);
  const [nonMetricFields, setNonMetricFields] = useState({ ...records });

  const handleSubmit = useCallback(() => {
    let isMetricsAvailable = false
    let isDimensionNameError = false;
    let isIndexError = {error: true, dimensionName: ''};
    let isFieldsError = {error: false, dimensionName: ''};

    let keys = Object.keys(records);
    for (let i = 0; i < keys.length; i++) {
      if (records[keys[i]].values.metric) {
        isMetricsAvailable = true;
        break;
      }
    }

    if (!programName && programName === '') {
      swal("", "Please enter program name", "error");
      return;
    }

    if (!isMetricsAvailable) {
      swal("", "Please select atleast one metric", "error");
      return;
    }

    for (let i = 0; i < dimensions.length; i++) {
      if (dimensions[i].name === '') {
        isDimensionNameError = true;
        break;
      }
    }

    if (isDimensionNameError) {
      swal("", `Please enter name for dimension`, "error");
      return;
    }

    for (let i = 0; i < dimensions.length; i++) {
      if (dimensions[i].fields.length === 0) {
        isFieldsError.error = true;
        isFieldsError.dimensionName = dimensions[i].name
        break;
      }
    }

    if (isFieldsError.error) {
      swal("", `Please add atleast one field for ${isFieldsError.dimensionName} dimension`, "error");
      return;
    }

    for (let i = 0; i < dimensions.length; i++) {
      for (let j = 0; j < dimensions[i].fields.length; j++) {        
        if (dimensions[i].fields[j].value === "") {
          isFieldsError.error = true;
          isFieldsError.dimensionName = dimensions[i].name
          break;
        }
      }

      if (isFieldsError.error) {
        break;
      }
    }

    if (isFieldsError.error) {
      swal("", `Please select the field in ${isFieldsError.dimensionName} dimension`, "error");
      return;
    }

    for (let i = 0; i < dimensions.length; i++) {
      isIndexError.error = true;
      
      if (dimensions[i].fields.length > 1) {
        for (let j = 0; j < dimensions[i].fields.length; j++) {
          if (dimensions[i].fields[j].isIndex) {
            isIndexError.error = false;
            isIndexError.dimensionName = dimensions[i].name
          }
        }

        if (isIndexError.error) {
          break;
        }
      } else {
        isIndexError.error = false;
      }
    }

    if (isIndexError.error) {
      swal("", `Please add atleast one index for ${isIndexError.dimensionName} dimension`, "error");
      return;
    }
    
    onUpdate(normalizeModifiedRecords(records), {programName, programDesc, dimensions});
  }, [onUpdate, records, programName, programDesc, dimensions]);

  const onRemove = useCallback((keyToRemove: string) => {
    setRecords((prev: any) => omit(prev, [keyToRemove]));
  }, []);

  const handleInputChange = useCallback(
    (ev: any, key: string) => {
      const recordsClone = { ...records };
      recordsClone[key].values.updated_col_name = ev.target.value;
      
      setRecords(recordsClone);
    },
    [records]
  );

  const getReadableDataType = (dataType: string) => {
    switch(dataType) {
      case 'int64':
        return 'Number';
      case 'float64':
        return 'Number';
      case 'object':
        return 'String';
      case 'datetime64':
        return 'Date Time';
      default:
        return dataType
    }
  }

  const handleMetricChange = useCallback(
    (ev: any, key: string) => {
      if (ev.target.checked) {
        removeFieldFromNonMetricFields(key);
      } else {
        addFieldToNonMetricFields(key)
      }

      const recordsClone = { ...records };
      recordsClone[key] = {
        ...recordsClone[key],
        values: {
          ...recordsClone[key].values,
          metric: ev.target.checked
        },
      };
      setRecords(recordsClone);
    },
    [records]
  );

  const addFieldToNonMetricFields = (key: string) => {
    let nonMetricFieldsClone = { ...nonMetricFields };
    nonMetricFieldsClone = {
      ...nonMetricFieldsClone,
      [key]: records[key]
    };
    
    setNonMetricFields(nonMetricFieldsClone);
  }

  const removeFieldFromNonMetricFields = (key: string) => {
    let nonMetricFieldsClone = { ...nonMetricFields };
    delete nonMetricFieldsClone[key];
    setNonMetricFields(nonMetricFieldsClone);
  }

  const addDimension = useCallback(
    () => {
      setDimensions([
        ...dimensions,
        {
          name: '',
          fields: []
        }
      ]);
    },
    [dimensions]
  );

  const handleDimensionNameChange = useCallback(
    (ev: any, ind: number) => {
      const dimensionsClone = [...dimensions];
      dimensionsClone[ind] = {
        ...dimensionsClone[ind],
        name: ev.target.value
      }
      
      setDimensions(dimensionsClone);
    },
    [dimensions]
  );

  const onAddFieldFromDimension = useCallback(
    (ind: number) => {
      const dimensionsClone = [...dimensions];
      dimensionsClone[ind].fields.push({value: ''});
      setDimensions(dimensionsClone);      
    },
    [dimensions]
  );

  const handleDimensionFieldChange = useCallback(
    (ev: any, ind: number, field_ind: number) => {
      const dimensionsClone = [...dimensions];
      //console.log(dimensionsClone[ind].fields[field_ind], dimensionsClone[ind].fields[field_ind].key)
      const recordsClone = { ...records };
      recordsClone[ev.target.value] = {
        ...recordsClone[ev.target.value],
        values: {
          ...recordsClone[ev.target.value].values,
          dimension: true
        },
      };
      setRecords(recordsClone);

      dimensionsClone[ind].fields[field_ind] = {
        ...dimensionsClone[ind].fields[field_ind],
        isPrimary: false,
        isIndex: false,
        data: records[ev.target.value],
        value: ev.target.value
      };
      setDimensions(dimensionsClone);
    },
    [dimensions]
  );

  const handleDimensionPrimaryKeyChange = useCallback(
    (ev: any, ind: number, field_ind: number) => {
      const dimensionsClone = [...dimensions];
      dimensionsClone[ind].fields[field_ind] = {
        ...dimensionsClone[ind].fields[field_ind],
        isPrimary: ev.target.checked
      };
      setDimensions(dimensionsClone);
    },
    [dimensions]
  );

  const handleDimensionIndexChange = useCallback(
    (ev: any, ind: number, field_ind: number) => {
      const dimensionsClone = [...dimensions];
      dimensionsClone[ind].fields[field_ind] = {
        ...dimensionsClone[ind].fields[field_ind],
        isIndex: ev.target.checked
      };
      setDimensions(dimensionsClone);
    },
    [dimensions]
  );

  const onRemoveFieldFromDimension = useCallback(
    (ind: number, field_ind: number) => {
      const dimensionsClone = [...dimensions];
      const recordsClone = { ...records };
      
      if (dimensionsClone[ind].fields[field_ind].value !== '') {
        recordsClone[dimensionsClone[ind].fields[field_ind].value].values.dimension = false;
        setRecords(recordsClone);
      }

      dimensionsClone[ind].fields.splice(field_ind, 1);
      setDimensions(dimensionsClone);
    },
    [dimensions]
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-4/12">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Program Name
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="name"
              value={programName}
              onChange={(ev)=>setProgramName(ev.target.value)}
              id="name"
              className={`block w-full rounded-md py-1.5 pl-3 text-gray-900 ring-1 bg-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none ${programName === '' ? 'ring-pink-600 focus:ring-pink-600' : ''}`}
              placeholder="Program name"
            />
          </div>
        </div>
        <div className="w-8/12 ml-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Program Description
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <textarea
              name="description"
              id="description"
              value={programDesc}
              onChange={(ev)=>setProgramDesc(ev.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3  text-gray-900 ring-1 bg-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
              placeholder="Program description"
            />
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left text-black mt-4">
        <thead className="text-xs text-black uppercase bg-gray-50">
          <tr className="bg-gray-100 border-2 border-dashed border-[#e1edff] text-center">
            <td className="text-left py-2">Field</td>
            <td className="text-left">Type</td>
            <td className="text-left">Is Metric?</td>
            {/* <td className="text-left">Is Dimension?</td> */}
            {/* <td>Remove</td> */}
          </tr>
        </thead>
        <tbody className="border">
          {map(records, (rec_value, rec_key) => {
            return (
              <tr className="bg-white border-b" key={rec_key}>
                <td>
                  <input
                    type="text"
                    className={`bg-white px-2 py-1 w-full outline-none ${records?.[rec_key]?.values.updated_col_name === '' ? 'ring-1 ring-pink-600 focus:ring-pink-600' : ''}`}
                    defaultValue={records?.[rec_key]?.values.updated_col_name}
                    onChange={(ev) => handleInputChange(ev, rec_key)}
                  />
                </td>
                <td>
                  {/* <select
                    className="bg-white border px-2 py-1 w-full"
                    value={findSelectValue(rec_value)}
                    onChange={(ev) => handleSelectChange(ev, rec_key)}
                  >
                    {map(
                      omit(rec_value?.values, "updated_col_name"),
                      (v, k) => (
                        <option value={k}>{k}</option>
                      )
                    )}
                  </select> */}
                  <p>
                    {getReadableDataType(rec_value?.values['type'])}
                  </p>
                </td>
                <td>
                  {(rec_value.values.type === "int64" || rec_value.values.type === "float64") && (
                    <div>
                      <Checkbox crossOrigin="true" checked={rec_value.values.metric} disabled={rec_value.values.dimension} onChange={(event) => handleMetricChange(event, rec_key)} />
                    </div>
                  )}
                </td>
                {/* <td>
                  {rec_value.values.type === "datetime64" ? (
                    <div>
                      <Checkbox crossOrigin="true" disabled={rec_value.values.metric} onChange={(event) => handleTimeDimensionChange(event, rec_key)} />
                    </div>
                  ) : (
                    <div>
                      <Checkbox crossOrigin="true" checked={rec_value.values.dimension} disabled={rec_value.values.metric} onChange={(event) => handleDimensionChange(event, rec_key)} />
                    </div>
                  )}
                </td> */}
                {/* <td className="text-center text-danger">
                  <IoMdTrash
                    size="1.2rem"
                    className="cursor-pointer mx-auto bg-danger"
                    color="#DC143C"
                    onClick={() => onRemove(rec_key)}
                  />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-5">
        <div className="p-3 rounded overflow-hidden shadow-lg shadow-indigo-500/40">
          <div className="p-2 mb-3 flex justify-between items-center bg-gray-200">
            <h3 className="font-bold text-xl mb-3">Dimensions</h3>
            <button className="btn btn-primary mr-3" onClick={() => addDimension()}>+ Add Dimension</button>
          </div>
          {dimensions.length > 0 ? dimensions.map((dimension: any, ind: number) => (
            <div key={"dimension_" + ind} className="shadow-lg p-3">
              <div className="flex">
                <div className="flex justify-between flex-1">
                  <input className={`block rounded-md py-1.5 pl-3 text-gray-900 ring-1 bg-white ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none ${dimension.name === '' ? 'ring-pink-600 focus:ring-pink-600' : ''}`} value={dimension.name} placeholder="Dimension Name" onChange={(ev) => handleDimensionNameChange(ev, ind)} />
                  <button className="btn btn-primary mr-3" onClick={() => onAddFieldFromDimension(ind)}>+ Add Field</button>
                </div>
                <IconButton size="sm" variant="text">
                  <BsXLg />
                </IconButton>
              </div>
              <table className="w-full text-sm text-left text-black mt-4">
                <thead className="text-xs text-black uppercase bg-gray-50">
                  <tr className="bg-gray-100 border-2 border-dashed border-[#e1edff] text-center">
                    <td className="text-left py-2">Field</td>
                    <td className="text-left">Is Index?</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="border">
                  {dimension.fields.map((field: any, field_ind: number) => (
                    <tr className="bg-white border-b" key={"dimension_field_" + field_ind}>
                      <td>
                        <select
                          className={`bg-white border px-2 py-1 w-full outline-none ${field.value === '' ? 'ring-1 ring-pink-600 focus:ring-pink-600' : ''}`}
                          value={field.value}
                          onChange={(ev) => handleDimensionFieldChange(ev, ind, field_ind)}
                        >
                          <option value="" disabled>Select field</option>
                          {map(nonMetricFields, (v, k) => (
                              <option key={k} value={k} disabled={records[k].values.dimension}>{k}</option>
                            )
                          )}
                        </select>
                      </td>
                      {/* <td>
                        <div>
                          <Checkbox crossOrigin="true" value={field.isPrimary} disabled={field.isIndex} onChange={(event) => handleDimensionPrimaryKeyChange(event, ind, field_ind)} />
                        </div>
                      </td> */}
                      <td>
                        <div>
                          <Checkbox crossOrigin="true" value={field.isIndex} disabled={field.isPrimary} onChange={(event) => handleDimensionIndexChange(event, ind, field_ind)} />
                        </div>
                      </td>
                      <td>
                        <IconButton size="sm" variant="text" onClick={() => onRemoveFieldFromDimension(ind, field_ind)}>
                          <BsFillTrashFill />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                  {dimension.fields.length === 0 && (
                    <tr>
                      <td colSpan={3}>
                        <p className="text-center font-bold">No fields added</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {dimension.fields.length === 0 && (
                <p className="text-pink-600">Please add atleast one field</p>
              )}
            </div>
          )): (
            <p className="text-center font-bold">No dimensions selected</p>
          )}
        </div>
      </div>
      <div>
        <button className="btn btn-primary w-full mt-2" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateEventTable;
