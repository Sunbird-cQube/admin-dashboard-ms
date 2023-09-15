import React, { FC } from 'react'
//@ts-ignore
import  jsonToTable  from "json-to-table";
import { map } from 'lodash';
const GenericDisplayTable:FC<any> = ({data}) => {
  
    const tabled = jsonToTable(data);
   
  return (
    <>
       <table className="w-full text-sm text-left text-black mt-4">
        <thead className="text-xs text-black uppercase bg-gray-50">
          <tr className="bg-gray-100 border-2 border-dashed border-[#e1edff] text-center">
              {map(tabled?.[0],(headings)=>(<th className='p-2 border'>{headings}</th>))}
          </tr>
        </thead>
        <tbody className="border">
          {map(tabled, (rec_value, index) => {
            if(Number(index)===0) return
            return (
              <tr className="bg-white border-b p-2" key={index}>
                {map(rec_value,(col)=>(<td className='p-2 border'>{col}</td>))}
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default GenericDisplayTable