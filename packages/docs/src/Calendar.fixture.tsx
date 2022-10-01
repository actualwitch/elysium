import styled from "@emotion/styled";
import { DateTime, Interval, Settings } from "luxon";
import { useMemo, useState } from "react";

Settings.defaultZone = "CET";

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100vh;
`;
const Day = styled.div`
`;

export default () => {
  const [now, setNow] = useState(() => DateTime.local());
  const [lens, setLens] = useState(() => {
    const start = now.startOf("month");
    return { weekNumber: start.weekNumber, weekYear: start.weekYear, weeks: 5 };
  });
  const slice = useMemo(() => {
    const { weekNumber, weekYear, weeks } = lens;
    const start = DateTime.fromObject({ weekNumber, weekYear }).startOf("week");
    return Interval.fromDateTimes(start, start.plus({ weeks }).endOf("week"));
  }, [now, lens]);
  return (
    <Calendar>
      {slice.splitBy({ day: 1 }).map(({ start }) => (
        <Day key={start.toISODate()}>{start.toISODate()}</Day>
      ))}
    </Calendar>
  );
};
