export const discordId = "988801425196867644";
export const spotifyProfileLink =
  "https://open.spotify.com/user/31fucuyc76nn7m677bpz3aqw5q3u?si=92d0815c7dcb4e86";

export const CaliforniaTimeFormatter = new Intl.DateTimeFormat(undefined, {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

export const RelativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  style: "long",
});

export const dob = new Date("05-07-2004");
export const age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
export const hasHadBirthdayThisYear =
  new Date().getMonth() >= dob.getMonth() &&
  new Date().getDate() >= dob.getDate();

export const nextBirthdayYear =
  new Date().getFullYear() + (hasHadBirthdayThisYear ? 1 : 0);
export const daysUntilBirthday = RelativeTimeFormatter.formatToParts(
  Math.floor(
    (new Date(nextBirthdayYear, dob.getMonth(), dob.getDay() + 1).getTime() -
      Date.now()) /
      1000 /
      60 /
      60 /
      24
  ),
  "day"
)[1]!.value.toString();
