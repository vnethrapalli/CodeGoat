import http from 'k6/http';
import { check } from 'k6';

//Uses 100 virtual users (VUs) to send requests to the website
export const options = {
  stages: [
    { duration: '30s', target: 100 }, // traffic ramp-up from 1 to 100 users over 30 seconds.
    { duration: '5m', target: 100 }, // stay at 100 users for 5 minutes
    { duration: '30s', target: 0 }, // ramp-down to 0 users
  ],
};

//Checks if the response status is 200
export default function () {
  const res = http.get('https://codegoat-uzgj.onrender.com');

  check(res, {
    'is status 200': (r) => r.status === 200
  });
}

// command: k6 run ./k6/script.js