import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


export default function ShowTimings({imdbId}) {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [showTimes, setShowTimes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShowTimes = async() => {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${backendUrl}/shows/${imdbId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowTimes(response.data);
            console.log(response.data)
        }
        fetchShowTimes();
    },[]);

    // Group show times by date
    const groupedShowTimes = showTimes.reduce((acc, show) => { // acc is for accumulator
        const date = show.date_scheduled;
        if (!acc[date]){
            acc[date] = [];
        }
        acc[date].push(show);
        return acc;
    }, {});


    return (
        <div className="max-w-5xl py-8">
          <h2 className="text-3xl font-bold mb-8">Available Shows</h2>
      
          {Object.entries(groupedShowTimes).map(([date, show]) => (
            <div
              key={date}
              className="border rounded-xl p-6 shadow-sm mb-6"
            >
              <h3 className="text-xl font-semibold mb-6">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
      
              <div className="flex flex-wrap gap-5">
                {show.map((show) => (
                  <button
                    key={show.id}
                    className="w-28 h-20 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                    onClick={() => navigate(`/movie/${imdbId}/new_booking/${show.id}`)}
                  >
                    <p className="font-semibold text-lg">
                      {new Date(
                        `1970-01-01T${show.time_scheduled}` //the JS Date constructor requires both date-time so here we have given dummy date since we only care about the time here.
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
      
                    <p className="text-sm mt-2">
                      ₹{show.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
  }