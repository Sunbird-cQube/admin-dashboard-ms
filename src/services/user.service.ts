import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import axios from "axios";
import swal from "sweetalert";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userSubject = new BehaviorSubject(
  process.browser &&
    JSON.parse(localStorage.getItem("app-user-details") as string)
);

function login(username: string, password: string) {
  return axios
    .post(`${apiUrl}/admin/login`, { username, password })
    .then((userDetails) => {
      userSubject.next(userDetails);
      localStorage.setItem("app-user-details", JSON.stringify(userDetails));

      return userDetails;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("app-user-details");
  userSubject.next(null);
  Router.push("/login");
}

const uploadRawCSV = async (token: string, body: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_CSV_PARSER_API}/api/upload-raw-csv/?token=${token}`,
    body
  );
};
const generateIngestFiles = async (
  token: string,
  records: any,
  programInfo: any
) => {
  console.log({programInfo})
  return axios.post(
    `${process.env.NEXT_PUBLIC_CSV_PARSER_API}/api/generate-ingest-files/?token=${token}`,
    {
      program_name: programInfo.programName,
      program_desc: programInfo.programDesc,
      column_metadata: records,
    }
  );
};

const getDimensions = (token: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CSV_PARSER_API}/api/dimensions/?token=${token}`
  );
};

const getEvents = (token: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CSV_PARSER_API}/api/events/?token=${token}`
  );
};

const getFileContent = (token: string, filename: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CSV_PARSER_API}/api/get-file-content/?token=${token}&filename=${filename}`
  );
};

const downloadIngestFiles = (token: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_CSV_PARSER_API}/api/downlod-ingest/?token=${token}`,
    {
      responseType: "blob", // Specify the response type as a binary blob
    }
  );
};

export const debugSchema = (data: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_DEBUGGER_API}/validate`,
    data
  );
};

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  generateIngestFiles,
  uploadRawCSV,
  getDimensions,
  getEvents,
  getFileContent,
  downloadIngestFiles,
  debugSchema,
};
