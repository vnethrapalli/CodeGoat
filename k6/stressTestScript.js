import http from 'k6/http';
import { check } from 'k6';

//Ramps up the traffic from 100 to 1000 users to find website breaking point
export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 400 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 600 },
    { duration: '30s', target: 700 },
    { duration: '30s', target: 800 },
    { duration: '30s', target: 900 },
    { duration: '30s', target: 1000 },
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