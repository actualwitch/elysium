import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DateTime, Interval, Settings, WeekNumbers } from "luxon";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

Settings.defaultZone = "CET";

const Calendar = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;
const Week = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  & > * {
    flex: 1;
  }
`;
const Day = styled.div<{ today?: boolean }>`
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

const OVERSCAN = 90; // weeks

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => DateTime.local());
  const [lens, setLens] = useState(() => {
    const { weekNumber, weekYear } = now;
    return { weekNumber, weekYear };
  });

  const anchor = useMemo(() => {
    const { weekNumber, weekYear } = lens;
    return DateTime.fromObject({ weekNumber, weekYear }).startOf("week");
  }, [lens]);

  const virtualizer = useVirtualizer({
    getScrollElement: () => ref.current,
    count: 2 * OVERSCAN,
    estimateSize: () => 100,
    overscan: 5,
  });

  useLayoutEffect(() => {
    virtualizer.scrollToIndex(OVERSCAN + 1, { align: "center", smoothScroll: false });
  }, []);

  return (
    <Calendar ref={ref}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const week = virtualRow.index - OVERSCAN;
          const start = week > 0 ? anchor.plus({ week }) : anchor.minus({ week: -week });
          const interval = Interval.fromDateTimes(start, start.endOf("week"));
          return (
            <Week
              key={virtualRow.index}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}>
              {interval.splitBy({ day: 1 }).map(({ start }) => (
                <Day key={start.valueOf()} today={start.equals(now.startOf("day"))}>
                  {start.toLocaleString({ month: "long", day: "2-digit", year: "numeric" })}
                </Day>
              ))}
            </Week>
          );
        })}
      </div>
      <Global styles={globalStyle} />
    </Calendar>
  );
};
