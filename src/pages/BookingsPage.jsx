import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    axios
      .get("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setBookings(response.data);
      });
  }, []);
  return (
    <>
      <div>
        <AccountNav />
        <div>
          {bookings?.length > 0 &&
            bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-4 bg-gray-200 rounded-2xl oveflow-hidden"
              >
                <div className="w-48">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="mt-3 grow">
                  <h2 className="text-xl">{booking.place.title}</h2>

                  <BookingDates booking={booking} />

                  <div className=" gap-2">
                    <div className="flex gap-1 items-center ">
                      Total Price :
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      {booking.place.price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
