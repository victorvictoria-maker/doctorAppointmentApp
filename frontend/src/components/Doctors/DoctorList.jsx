import DoctorCard from "./DoctorCard";
// import { doctors } from "./../../assets/data/doctors";

import useFetchData from "./../../hooks/useFetchData";
import { BASE_URL } from "./../../config";
import Loading from "../Loader/Loading";
import Error from "../Error/Error";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] mt-5'>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
