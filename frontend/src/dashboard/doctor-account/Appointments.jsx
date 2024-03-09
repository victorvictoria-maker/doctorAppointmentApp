import { formatDate } from "../../utils/formatDate";

/* eslint-disable react/prop-types */
const Appointments = ({ appointments }) => {
  return (
    <table className='w-full text-left text-sm text-gray-500'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th scope='col' className='px-6 py-3'>
            Name
          </th>
          <th scope='col' className='px-6 py-3'>
            Gender
          </th>
          <th scope='col' className='px-6 py-3'>
            Payment
          </th>
          <th scope='col' className='px-6 py-3'>
            Price
          </th>
          <th scope='col' className='px-6 py-3'>
            Booked on
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((item) => {
          return (
            <tr key={item._id}>
              <th
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'
              >
                <img
                  src={item.user.photo}
                  alt='User Photo'
                  className='w-10 h-10 rounded-full'
                />
                <div className='pl-3'>
                  <div className='text-base font-semibold'>
                    {item.user.name}
                  </div>
                  <div className='text-normal text-gray-500'>
                    {item.user.email}
                  </div>
                </div>
              </th>
              <td className='px-6 py-4'>{item.user.gender}</td>
              <td className='px-6 py-4'>
                {item.isPaid && (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'>
                      Paid
                    </div>
                  </div>
                )}
                {!item.isPaid && (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'>
                      Unpaid
                    </div>
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>{item.ticketPrice}</td>
              <td className='px-6 py-4'>{formatDate(item.createdAt)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Appointments;
