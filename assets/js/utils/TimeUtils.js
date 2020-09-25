function secToHMSS(sec) {
  if (sec === 0) {
    return "0:0:00";
  }
  return secToHours(sec) + ":" + secToMSS(sec);
}

function secToMSS(sec) {
  if (sec == 0) {
    return "0:00";
  }

  let m = Math.floor((sec % 3600) / 60);
  let s = Math.floor((sec % 3600) % 60);

  if (s < 10) {
    s = "0" + s;
  }

  return m + ":" + s;
}

function secToHours(sec) {
  return Math.floor(sec / 3600);
}

export { secToHMSS, secToMSS, secToHours };
