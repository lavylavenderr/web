import { differenceInDays, addYears, differenceInYears } from "date-fns";

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

export const dob = new Date("2004-05-07");
export const age = differenceInYears(new Date(), dob);
export const hasHadBirthdayThisYear =
  new Date().getMonth() >= dob.getMonth() &&
  new Date().getDate() >= dob.getDate();

export const nextBirthdayYear =
  new Date().getFullYear() + (hasHadBirthdayThisYear ? 1 : 0);

export const daysUntilBirthday = (): number => {
  const currentDate = new Date();
  let nextBirthday = new Date(
    currentDate.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );
  if (nextBirthday < currentDate) {
    nextBirthday = addYears(nextBirthday, 1);
  }
  return differenceInDays(nextBirthday, currentDate);
};
