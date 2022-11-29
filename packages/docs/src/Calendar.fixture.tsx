import { WithChildren } from "@elysium/utils";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DateTime, Duration, Interval, Settings, WeekNumbers } from "luxon";
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SEPARATOR } from "./const";

Settings.defaultZone = "CET";

type WeekReference = {
  weekNumber: number;
  weekYear: number;
};

const Calendar = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  /* scroll-snap-type: y mandatory; */
`;

const Container = styled.div`
  width: 100%;
  position: relative;

  & > * + * {
    border-bottom: 0.01ch solid pink;
    & > * + * {
      border-left: 0.01ch solid pink;
    }
  }
`;

const WeekContainer = styled.div`
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
  flex-direction: column;
  align-items: baseline;
  justify-content: flex-end;
  padding: 0.6ch;
  ${(p) =>
    p.today &&
    css`
      text-decoration: underline;
    `}

  p {
    margin: 0;
  }
`;

const globalStyle = css`
  body {
    margin: 0;
  }
`;

const OVERSCAN = 1;
const HEIGHT = 100;

const useNow = (snapshot = false) => {
  const [now, setNow] = useState(() => DateTime.local());
  useEffect(() => {
    if (snapshot) return;
    const secsToNextMin = 60 - now.second;
    setTimeout(() => {
      setNow(DateTime.local());
    }, secsToNextMin);
  }, [now, snapshot]);
  return now;
};

const Week: React.FC<WeekReference & { size: number; shift: number }> = memo(
  ({ weekNumber, weekYear, size, shift }) => {
    const start = DateTime.fromObject({ weekNumber, weekYear });
    const week = Interval.fromDateTimes(start, start.endOf("week"));
    const today = DateTime.local();
    return (
      <WeekContainer
        style={{
          height: `${size}px`,
          transform: `translateY(${shift}px)`,
        }}>
        {week.splitBy({ day: 1 }).map(({ start }, index) => { 
          const date = start.toISODate();
          return (
            <Day key={date} today={date === today.toISODate()}>
              {index === 0 && (
                <p>
                  {start.toLocaleString({ year: "numeric" })} W{start.weekNumber}
                </p>
              )}
              <p>
                {start.toLocaleString({ month: "long", day: "2-digit" })}
              </p>
            </Day>
          );
        })}
      </WeekContainer>
    );
  },
);

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const isSwitchingRef = useRef(false);
  const now = useNow(true);
  const [anchor, setAnchor] = useState(() => now.startOf("year"));
  const [duration, setDuration] = useState<number>(() => now.weeksInWeekYear);

  const count = duration + OVERSCAN * 2;
  const virtualizer = useVirtualizer({
    getScrollElement: () => ref.current,
    count,
    initialOffset: OVERSCAN * HEIGHT * 2,
    estimateSize: () => HEIGHT,
    overscan: OVERSCAN,
  });

  useLayoutEffect(() => {
    virtualizer.scrollToIndex(now.weekNumber + OVERSCAN - 1, { align: "center", smoothScroll: false });
  }, []);
  useLayoutEffect(() => {
    if (isSwitchingRef.current) {
      isSwitchingRef.current = false;
    }
  });

  return (
    <Calendar ref={ref}>
      <Container
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const { weekNumber, weekYear } = anchor.plus({ week: virtualRow.index });
          if (virtualRow.index === 0 && !isSwitchingRef.current) {
            isSwitchingRef.current = true;
            const lastYear = anchor.minus({ year: 1 });
            setAnchor(lastYear);
            setDuration(lastYear.weeksInWeekYear + lastYear.plus({ year: 1 }).weeksInWeekYear);
            virtualizer.scrollToIndex(lastYear.weeksInWeekYear - 1, {
              align: "start",
              smoothScroll: false,
            });
          }
          if (virtualRow.index === count - 1 && !isSwitchingRef.current) {
            isSwitchingRef.current = true;
            const durationEnd = anchor.plus({ week: duration });
            const start = durationEnd.minus({ year: 1 });
            setAnchor(start);
            setDuration(start.weeksInWeekYear + start.plus({ year: 1 }).weeksInWeekYear);
            virtualizer.scrollToIndex(start.weeksInWeekYear, {
              align: "end",
              smoothScroll: false,
            });
          }
          return (
            <Week
              key={`${weekYear}${SEPARATOR}${weekNumber}`}
              weekNumber={weekNumber}
              weekYear={weekYear}
              size={virtualRow.size}
              shift={virtualRow.start}
            />
          );
        })}
      </Container>
      <Global styles={globalStyle} />
    </Calendar>
  );
};
