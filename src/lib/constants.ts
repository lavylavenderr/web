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

// temp fix: i have to offset it by a day for it to work, my birthday is really May 7th :)
export const dob = new Date("2004-05-07");
export const age = differenceInYears(new Date(), dob);
export const hasHadBirthdayThisYear =
  new Date().getMonth() >= dob.getMonth() &&
  new Date().getDate() >= dob.getDate();

export const daysUntilBirthday = (): number =>
  (() => {
    const currentDate = new Date();
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );
    const daysUntilNextBirthday = Math.ceil(
      (nextBirthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilNextBirthday >= 0
      ? daysUntilNextBirthday
      : Math.ceil(
          (new Date(
            nextBirthday.getFullYear() + 1,
            dob.getMonth(),
            dob.getDate()
          ).getTime() -
            currentDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
  })();
