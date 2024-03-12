import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtrainfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [price, setPrice] = useState(1200);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtrainfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        <div>
          {inputHeader(header)}
          {inputDescription(description)}
        </div>
      </>
    );
  }

  const token = localStorage.getItem("Token");

  async function savePlace(ev) {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update the existing one
      await axios.put(
        "/places",
        {
          id,
          ...placeData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          placeData,
        }
      );
      setRedirect(true);
    } else {
      // create new

      await axios.post("/places", placeData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput("Title", "Title for your place and some description")}

          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            placeholder="title"
          ></input>

          {preInput("Address", "Address to the place")}

          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="address"
          ></input>

          {preInput("Photos", "More = better")}

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {preInput("Description", "description of place")}

          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput("Perks", "select all the perks")}

          <Perks selected={perks} onChange={setPerks} />

          {preInput("Extra info", "House rules")}

          <textarea
            value={extraInfo}
            onChange={(ev) => setExtrainfo(ev.target.value)}
          />

          {preInput(
            "Check In & Out times",
            "add check in and out times, remmember to have some time window for cleaning the room betwen guests"
          )}

          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-3 -mb-1 ">Check-In time</h3>
              <input
                type="text"
                placeholder="16:00"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-3 -mb-1">Check-Out time</h3>
              <input
                type="text"
                placeholder={" 11:00"}
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-3 -mb-1">max num of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>

            <div>
              <h3 className="mt-3 -mb-1">Price per Night</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
