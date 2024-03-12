import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace(ev) {
    const tokenLocal = localStorage.getItem("Token");

    ev.preventDefault();

    const response = await axios.post(
      "/bookings",
      {
        checkIn,
        checkOut,
        numberOfDays,
        name,
        phone,
        place: place._id,
        price: numberOfDays,
      },
      {
        headers: { Authorization: `Bearer ${tokenLocal}` },
        withCredentials: true,
      }
    );

    const bookingId = response.data._id;

    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="bg-white shadow rounded-2xl p-4">
        <div className="text-2xl text-center py-2">
          price : ₹{place.price} / Per Night
        </div>
        <div className="border rounded-2xl mt-4 ">
          <div className="flex">
            <div className=" px-4 py-3 ">
              <label>Check In :: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              ></input>
            </div>
            <div className=" px-4 py-3 border-t">
              <label>Check Out :: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              ></input>
            </div>
          </div>
          <div className=" px-4 py-3 border-t">
            <label>Number of guests :: </label>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            ></input>
          </div>

          {numberOfDays > 0 && (
            <div>
              <label>your name</label>
              <input
                className="py-3 px-4 border-t "
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              ></input>
              <label>Phone number</label>
              <input
                className="py-3 px-4 border-t "
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              ></input>
            </div>
          )}
        </div>

        <button onClick={bookThisPlace} className="primary">
          Book this place
          {numberOfDays > 0 && <span> ₹{numberOfDays * place.price}</span>}
        </button>
      </div>
    </>
  );
}
