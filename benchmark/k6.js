import http from "k6/http";
import { check } from "k6";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

const host = "https://clumsy-squirrel-4315.pages.dev";
const headers = { "Origin": host };

const durations = [15, 30, 60, 90, 120, 135, 180, 240, 360];
let dates = [];
for (let month = 10; month <= 12; month++) {
  for (let day = 1; day <= 30; day++) {
    dates.push(`2025-${month}-${day}`);
  }
}

const createBookingCallback = http.expectedStatuses(200, 409);

export const options = {
   scenarios: {
     bookings: {
       executor: "constant-arrival-rate",
        duration: "1m",
        rate: 25,
        timeUnit: "1s",
        preAllocatedVUs: 50,
      },
    },
  };

export default function () {
  const duration = randomItem(durations);
  const date = randomItem(dates);

  let res = http.get(`http://localhost:3000/bookings?date=${date}&duration=${duration}`);
  check(res, {
    "response code was 200": (res) => res.status === 200,
  });

  if (randomIntBetween(1, 100) > 80) {
    const availableSlots = res.json();
    if (!availableSlots.length)
      return;

    const payload = randomItem(availableSlots);

    res = http.post("http://localhost:3000/bookings", payload, { headers, responseCallback: createBookingCallback });

    check(res, {
      "response code was 200 or 409": (res) => res.status === 200 || res.status === 409,
      "CORS header is present": (res) => res.headers["Access-Control-Allow-Origin"] === host,
    });
  }
}
