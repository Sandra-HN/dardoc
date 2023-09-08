import { mdiMenuDownOutline, mdiMenuUpOutline } from '@mdi/js';
import { useEffect, useState } from 'react';
import { useSampleBookings } from '../../hooks/sampleData';
import { Booking } from '../../interfaces';
import Button from '../Button';
import Buttons from '../Buttons';
import CardBoxModal from '../CardBox/Modal';
import ExportBookingsToExcel from '../ExportExcelButton';
import Icon from '../Icon';
type Props = {
  bookingType: string;
};
const TableSampleBookings = ({ bookingType }: Props) => {
  const { bookings } = useSampleBookings();
  const perPage = 5;
  const [numPages, setNumPages] = useState(1);
  const [pagesList, setPagesList] = useState([]);

  const columns = [
    { label: 'Booking ID', accessor: 'id', sortable: true },
    { label: 'Patient Details', accessor: 'patientName', sortable: true },
    { label: 'Service', accessor: 'service', sortable: true },
    { label: 'Date & Time', accessor: 'created', sortable: true },
    { label: 'Location', accessor: 'location', sortable: true },
    { label: 'Status', accessor: 'status', sortable: true },
  ];
  const [bookingsPaginated, setBookingsPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    setNumPages(bookings.length / perPage);

    setBookingsPaginated(
      bookings.slice(perPage * currentPage, perPage * (currentPage + 1))
    );
  }, [bookings, currentPage]);
  useEffect(() => {
    const pList = [];
    for (let i = 0; i < numPages; i++) {
      pList.push(i);
    }
    setPagesList(pList);
  }, [numPages]);

  const handleSortingChange = (accessor) => {
    console.log(accessor);
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...bookings].sort((a, b) => {
        return sortField === 'created'
          ? sortOrder === 'asc'
            ? Date.parse(a.created) - Date.parse(b.created)
            : Date.parse(b.created) - Date.parse(a.created)
          : a[sortField]
              .toString()
              .localeCompare(b[sortField].toString(), 'en', {
                numeric: true,
              }) * (sortOrder === 'asc' ? 1 : -1);
      });
      setBookingsPaginated(
        sorted.slice(perPage * currentPage, perPage * (currentPage + 1))
      );
    }
  };
  const handleSearch = async (event) => {
    const searchString = event.currentTarget.value;
    if (searchString.length > 3) {
      const filtered = await bookings.filter(
        (item) =>
          item.patientName.toLowerCase().includes(searchString.toLowerCase()) ||
          item.service.toLowerCase().includes(searchString.toLowerCase()) ||
          item.created.toLowerCase().includes(searchString.toLowerCase()) ||
          item.location.toLowerCase().includes(searchString.toLowerCase())
      );
      setBookingsPaginated(
        filtered.slice(perPage * currentPage, perPage * (currentPage + 1))
      );
    } else {
      setBookingsPaginated(
        bookings.slice(perPage * currentPage, perPage * (currentPage + 1))
      );
    }
  };
  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>
      <div className="flex justify-end gap-x-3 w-full lg:w-1/2 float-right my-10">
        <input
          type="text"
          className="w-8/12 h-10  cursor-pointer rounded-md"
          onChange={handleSearch}
          placeholder="Search Booking ID, Service, Location .."
        />
        <ExportBookingsToExcel
          csvData={bookings}
          fileName={bookingType + ' Bookings'}
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, accessor, sortable }) => {
              const cl = sortable
                ? sortField === accessor && order === 'asc'
                  ? 'up'
                  : sortField === accessor && order === 'desc'
                  ? 'down'
                  : 'default'
                : '';
              return (
                <th
                  className="text-center"
                  key={accessor}
                  onClick={
                    sortable ? () => handleSortingChange(accessor) : null
                  }
                >
                  {label}
                  {cl === 'down' ? (
                    <Icon
                      path={mdiMenuDownOutline}
                      size="20"
                      w=""
                      h="h-16"
                      className=""
                    />
                  ) : (
                    cl === 'up' && (
                      <Icon
                        path={mdiMenuUpOutline}
                        size="20"
                        w=""
                        h="h-16"
                        className="{}"
                      />
                    )
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {bookingsPaginated.map((booking: Booking) => (
            <tr onClick={() => setIsModalInfoActive(true)} key={booking.id}>
              <td className="text-center" data-label="Booking ID">
                {booking.id}
              </td>
              <td className="text-center" data-label="Patient Name">
                {booking.patientName}
              </td>
              <td className="text-center" data-label="Service">
                {booking.service}
              </td>
              <td className="text-center" data-label="Created">
                <small className="text-gray-500 dark:text-slate-400">
                  {booking.created}
                </small>
              </td>
              <td className="text-center" data-label="Location">
                {booking.location}
              </td>
              <td className="text-center" data-label="Status">
                {booking.status % 2 == 0 ? 'In Progress' : 'Pending'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  );
};

export default TableSampleBookings;
