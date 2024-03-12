import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallarey from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    const token = localStorage.getItem("Token");
    axios
      .get(
        `/places/${id}`,

        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      )
      .then((response) => {
        setPlace(response.data);
      });
  }, [id]);

  if (!place) return "";

  return (
    <>
      <div className="mt-4 bg-gray-50 px-8 -mx-8 py-4">
        <h1 className="text-2xl">{place.title}</h1>
        <AddressLink place={place} />
        <PlaceGallarey place={place} />

        <div className="mt-8 gap-2 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check-In : {place.checkIn} <br />
            Check-Out : {place.checkOut} <br />
            Max Number of Guests : {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>

        <div className="bg-white -mx-8 py-8 px-8 border-t-8">
          <div>
            <h2 className="font-semibold text-2xl">Extra Info</h2>
          </div>
          <div className="my-4 text-sm text-gray-700 leading-4">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
}
