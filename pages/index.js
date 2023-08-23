import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { useDebounce } from "use-debounce";

export default function index() {
  const [chuyenDoiMau, setchuyenDoimau] = useState("C");
  const [tenThanhPho, settenThanhPho] = useState("Roma");
  const [tenThanhPhoDebounce] = useDebounce(tenThanhPho, 500);
  const [thongTinNhietDo, setThongTinNhietDo] = useState({});

  useEffect(() => {
    if (tenThanhPho.length < 4) {
      return;
    }
    const URL = `https://ngoc.fly.dev/weather?city=${tenThanhPho}`;

    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          console.log(res);
          setThongTinNhietDo(res);
        } else {
          console.log("Nhap sai thanh pho");
        }
      });
  }, [tenThanhPhoDebounce]);

  return (
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white w-[1300px] h-[800px] shadow rounded-[28px] flex">
        <div className="w-[450px] h-full shadow bg-[#242F40] rounded-l-[30px] ">
          <div className="flex gap-3">
            <div>
              <BiSearch className="text-slate-300 text-xl mt-11 ml-9 "></BiSearch>
            </div>
            <div>
              <input
                value={tenThanhPho}
                onChange={(e) => {
                  settenThanhPho(e.target.value);
                }}
                className=" bg-transparent !outline-none text-slate-300 text-xl mt-10"
                placeholder="search city..."
              ></input>
            </div>
          </div>

          <div>
            <img
              className="w-full h-[240px] object-center mt-6"
              src={`https://ngoc.fly.dev/${thongTinNhietDo?.current?.weather[0].icon}.svg`}
              alt=""
            />
          </div>

          <div className="flex gap-2 text-slate-300 mt-10 ml-9">
            <span className="text-7xl">
              {dinhDangNhietDo(thongTinNhietDo?.current?.temp, chuyenDoiMau)}
            </span>
            <span className="font-medium text-4xl">°{chuyenDoiMau}</span>
          </div>

          <div className="flex gap-1 text-slate-300 mt-9 ml-9 text-[21px]">
            <p className="text-slate-400">{formatDate2(thongTinNhietDo.current?.dt)}</p>
          </div>

          <div class="pt-4 border-t border-gray-500 mt-7 ml-9 w-[264px] text-slate-300 text-[21px]">
            <div>{thongTinNhietDo?.current?.weather[0].main}</div>
            <div>{thongTinNhietDo?.current?.weather[0].description}</div>
          </div>

          <div>
            <img
              className="h-[115px] mt-6 rounded-xl flex justify-center items-center ml-9 w-[264px]"
              src={thongTinNhietDo.image}
              alt=""
            />
          </div>
        </div>

        <div className="w-full h-full shadow bg-[#F6F6F8] rounded-r-[30px]">
          <div className="mx-auto max-w-[900px] mt-10 ">
            <div className="flex justify-between ">
              <a className="font-semibold text-xl" href="">
                Week
              </a>
              <div className="flex gap-2">
                <div
                  style={{
                    background: chuyenDoiMau === "C" ? "black" : "none",
                    color: chuyenDoiMau === "C" ? "white" : "black",
                  }}
                  onClick={() => {
                    setchuyenDoimau("C");
                  }}
                  className="w-[42px] h-[42px] border rounded-full flex justify-center items-center font-semibold text-xl"
                >
                  °C
                </div>
                <div
                  style={{
                    background: chuyenDoiMau === "F" ? "black" : "none",
                    color: chuyenDoiMau === "F" ? "white" : "black",
                  }}
                  onClick={() => {
                    setchuyenDoimau("F");
                  }}
                  className="w-[42px] h-[42px] border rounded-full flex justify-center items-center font-semibold text-xl"
                >
                  °F
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mt-6 shadow border-none">
              {thongTinNhietDo.daily &&
                thongTinNhietDo.daily.slice(0, 7).map((thoiTiet) => {
                  return (
                    <div className=" w-[120px] h-[160px] border-none rounded-xl bg-white flex flex-col justify-center items-center">
                      <div className="font-semibold text-[18px] mt-5">
                        {formatDate3(thoiTiet?.dt)}
                      </div>
                      <div>
                        <img
                          className="w-[85px]"
                          src={`https://ngoc.fly.dev/${thoiTiet.weather[0].icon}.svg`}
                          alt=""
                        />
                      </div>
                      <div className="flex gap-3 font-semibold text-xl mb-5">
                        <p>
                          {Math.round(
                            dinhDangNhietDo(thoiTiet.temp.max, chuyenDoiMau)
                          )}
                          °
                        </p>
                        <p className="text-slate-400">
                          {Math.round(
                            dinhDangNhietDo(thoiTiet.temp.min, chuyenDoiMau)
                          )}
                          °
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="font-semibold text-xl mt-10">
              <p>Today's Highlights</p>
            </div>

            <div className="grid grid-cols-3 mt-[30px] gap-8">
              <div className="h-[180px] bg-white p-5 rounded-xl">
                <p className="font-semibold text-xl text-slate-400">UV Index</p>
                <div>
                  <div className="flex justify-center items-center mt-8">
                    <div
                      className="half-arc "
                      style={{
                        "--percentage": `${
                          (thongTinNhietDo?.current?.uvi * 100) / 15
                        }%`,
                      }}
                    >
                      <span className="label">
                        {thongTinNhietDo?.current?.uvi}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[180px] bg-white p-5 rounded-xl ">
                <p className="font-semibold text-xl text-slate-400">
                  Wild Status
                </p>
                <div className="font-semibold flex gap-2 items-baseline mt-4">
                  <p className="text-[40px]">{thongTinNhietDo?.current?.wind_speed}</p>
                  <p className="text-[20px]">km/h</p>
                </div>
                <div className="font-semibold text-[15px] text-[#374151] mt-2">
                  WSW
                </div>
              </div>

              <div className="h-[180px] bg-white p-5 rounded-xl ">
                <p className="font-semibold text-xl text-slate-400">
                  Sunrise & Sunset
                </p>
                <div className="flex gap-4 font-semibold items-center mt-3">
                  <BsFillSunriseFill className="text-5xl text-yellow-400"></BsFillSunriseFill>
                  <p className="text-[20px]">{formatDate(thongTinNhietDo?.current?.sunrise)}</p>
                </div>
                <div className="flex gap-4 font-semibold items-center mt-2">
                  <BsFillSunsetFill className="text-5xl text-yellow-400"></BsFillSunsetFill>
                  <p className="text-[20px]">{formatDate(thongTinNhietDo?.current?.sunset)}</p>
                </div>
              </div>

              <div className="h-[180px] bg-white p-5 rounded-xl shadow">
                <p className="font-semibold text-xl text-slate-400">Humidity</p>
                <div className="flex gap-2 mt-6">
                  <p className="text-4xl font-semibold">{thongTinNhietDo?.current?.humidity}</p>
                  <p className="font-semibold text-[20px]">%</p>
                </div>
              </div>

              <div className="h-[180px] bg-white p-5 rounded-xl">
                <p className="font-semibold text-xl text-slate-400">
                  Visibility
                </p>
                <div>
                  <div className="font-semibold flex gap-2 items-baseline mt-4">
                    <p className="text-[40px]">{thongTinNhietDo?.current?.visibility / 1000}</p>
                    <p className="text-[20px]">km</p>
                  </div>
                </div>
              </div>

              <div className="h-[180px] bg-white p-5 rounded-xl">
                <p className="font-semibold text-xl text-slate-400">
                  Dew Point
                </p>
                <div>
                  <p className="text-[35px] font-semibold mt-6">{thongTinNhietDo?.current?.dew_point}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dinhDangNhietDo = (doK, kieuNhietDo) => {
  switch (kieuNhietDo) {
    case "C":
      return Math.round((doK - 273.15) * 10) / 10;
    case "F":
      return Math.round((1.8 * (doK - 273) + 32) * 10) / 10;
    default:
      return doK;
  }
};


const formatDate = (inputTime) => {
  var a = new Date(inputTime * 1000);

  var hours = a.getHours();
  var minutes = a.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[a.getDay()];
  return strTime;
};

const formatDate2 = (inputTime) => {
  var a = new Date(inputTime * 1000);

  var hours = a.getHours();
  var minutes = a.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[a.getDay()];
  return dayOfWeek + ", " + strTime;
};

const formatDate3 = (inputTime) => {
  var a = new Date(inputTime * 1000);

  var hours = a.getHours();
  var minutes = a.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = days[a.getDay()];
  return dayOfWeek;
};