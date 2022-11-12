import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DateTime, Interval, Settings, WeekNumbers } from "luxon";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

Settings.defaultZone = "CET";

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
`;
const Week = styled.div`
  display: flex;
  & > * {
    flex: 1;
  }
`;
const Day = styled.div<{ today?: boolean }>`
  height: 9ch;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.01ch solid pink;
  ${(p) =>
    p.today &&
    css`
      text-decoration: underline;
    `}
`;

const globalStyle = css`
  body {
    margin: 0;
  }
`;

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => DateTime.local());
  const [lens, setLens] = useState(() => {
    const { weekNumber, weekYear } = now;
    return { weekNumber, weekYear, weeks: 8 };
  });
  const slice = useMemo(() => {
    const { weekNumber, weekYear, weeks } = lens;
    const start = DateTime.fromObject({ weekNumber, weekYear })
      .startOf("month")
      .startOf("week")
      .minus({ weeks })
      .startOf("week");
    const end = DateTime.fromObject({ weekNumber, weekYear })
      .endOf("month")
      .endOf("week")
      .plus({ weeks })
      .startOf("week");
    return Interval.fromDateTimes(start, end)
      .splitBy({ week: 1 })
      .map(({ start: { weekNumber, weekYear } }) => ({ weekNumber, weekYear }));
  }, [now, lens]);
  useLayoutEffect(() => {
    ref.current.scroll({ top: ref.current.scrollHeight / 2 });
  }, []);

  // const virtualizer = useVirtualizer<
  //   HTMLDivElement,
  //   {
  //     weekNumber: WeekNumbers;
  //     weekYear: number;
  //   }
  // >({ getScrollElement: () => ref.current, count: slice.length, estimateSize: () => 180 });

  return (
    <Calendar ref={ref}>
      {/* {virtualizer.getVirtualItems().map((item) => (
        <Week key={`${item}`}>
          {date.splitBy({ day: 1 }).map(({ start }) => (
            <Day key={start.valueOf()} today={start.equals(now.startOf("day"))}>
              {start.toLocaleString({ month: "long", day: "2-digit", year: "numeric" })}
            </Day>
          ))}
        </Week>
      ))} */}
      <Global styles={globalStyle} />
    </Calendar>
  );
};
