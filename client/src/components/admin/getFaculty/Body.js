import React, { useEffect, useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch, useSelector } from "react-redux";
import { getFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { SET_ERRORS } from "../../../redux/actionTypes";
const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getFaculty({ department }));
  };
  const faculties = useSelector((state) => state.admin.faculties.result);

  useEffect(() => {
    if (faculties?.length !== 0) {
      setLoading(false);
    }
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>All Faculty</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <form
            className="flex flex-col space-y-2 col-span-1"
            onSubmit={handleSubmit}>
            <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit">
              Search
            </button>
          </form>
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noFacultyError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noFacultyError || error.backendError}
                </p>
              )}
            </div>

            {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              faculties?.length !== 0 && (
                <div className={classes.adminData}>
                  <div className="grid grid-cols-12">
                    <h1 className={`${classes.adminDataHeading} col-span-1 `}>
                      Sr no.
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-3 `}>
                      Name
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2 `}>
                      Username
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-3 `}>
                      Email
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-3 `}>
                      Designation
                    </h1>
                  </div>
                  {faculties?.map((fac, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-12`}>
                      <h1
                        className={`${classes.adminDataBodyFields} font-bold border-0 col-span-1`}>
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-3 ${classes.adminDataBodyFields}`}>
                        {fac.name}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields} `}>
                        {fac.username}
                      </h1>
                      <h1
                        className={`col-span-3 ${classes.adminDataBodyFields}`}>
                        {fac.email}
                      </h1>
                      <h1
                        className={`col-span-3 ${classes.adminDataBodyFields}`}>
                        {fac.designation}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
