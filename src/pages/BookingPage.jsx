import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallarey from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState("");
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <>
      <div className="my-8">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <AddressLink className="my-2 block" place={booking.place} />
        <div className="bg-gray-200 gap-2 p-4 mb-4 rounded-2xl items-center justify-between flex ">
          <div>
            <h2 className="text-xl mb-2">Your booking Info :</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="bg-primary p-6 text-white rounded-2xl ">
            <div>Total Price </div>
            <div className="text-3xl">{booking.place.price}</div>
          </div>
        </div>
        <PlaceGallarey place={booking.place} />
      </div>
    </>
  );
}
