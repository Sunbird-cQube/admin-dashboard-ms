import { userService } from "@/services";
import { map } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import UpdateFileRecords from "../update-file-records";
import Breadcrumbs from "../breadcrumbs";

const MetricDimensionRecords: FC<any> = ({ data, token,goBack }) => {
  const [records, setRecords] = useState(data);
  const [dimensions, setDimensions] = useState<any>(null);
  const [events, setEvents] = useState<any>(null);
  const [showDimensions, setShowDimensions] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const fetchDimensions = useCallback(() => {
    setShowDimensions((prev) => !prev);
    userService.getDimensions(token).then((res) => {
      setDimensions(res?.data?.children ?? []);
    });
  }, [token]);

  const fetchEvent = useCallback(() => {
    setShowDimensions((prev) => !prev);
    userService.getEvents(token).then((res) => {
      setEvents(res?.data?.children ?? []);
    });
  }, [token]);

  useEffect(() => {
    fetchDimensions();
    fetchEvent();
  }, [fetchDimensions, fetchEvent]);

  return (
    <div>
      <Breadcrumbs setActiveTab={setActiveTab} token={token} goBack={goBack}/>
      {activeTab === "list" && (
        <div className="flex">
          <ul role="list" className="divide-y divide-gray-100 w-[50%] border">
            {records?.dimension?.length > 0 && (
              <>
                <li className="gap-x-3 py-3 bg-info px-2">Dimensions</li>
                {map(records?.dimension, (record: string) => (
                  <li className=" gap-x-3 p-2">{record}</li>
                ))}
              </>
            )}
          </ul>
          <ul role="list" className="divide-y divide-gray-100 w-[50%] border">
            {records?.metrics?.length > 0 && (
              <>
                <li className="flex justify-between gap-x-3 py-3 bg-info px-2">
                  Metrics
                </li>
                {map(records?.metrics, (record: string) => (
                  <li className="flex justify-between gap-x-3 p-2">{record}</li>
                ))}
              </>
            )}
          </ul>
        </div>
      )}
      {activeTab === "events" && (
        <UpdateFileRecords data={events} name="Events" token={token} />
      )}
      {activeTab === "dimensions" && (
        <UpdateFileRecords data={dimensions} name="Dimensions" token={token} />
      )}
    </div>
  );
};

export default MetricDimensionRecords;
