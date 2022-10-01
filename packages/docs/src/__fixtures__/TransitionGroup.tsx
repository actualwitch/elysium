import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { shuffle } from "d3-array";
import { readableColor, toColorString } from "polished";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { TransitionState, useListTransition } from "@elysium/utils";

const List = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  & > * + * {
    margin-top: 0.2em;
  }
`;

const Item = styled.li<{ color?: string; transitionState: TransitionState }>`
  padding: 0.2em 0.4em;
  background-color: ${(p) => p.color || "pink"};
  color: ${({ color = "pink" }) => readableColor(color)};
  border-radius: 3px;
  border: 1px solid black;
  display: flex;
  transition: 100ms ease-in-out;
  transform: translateX(-100px);
  opacity: 0;
  justify-content: space-between;
  ${({ transitionState }) => {
    if (transitionState === "entered") {
      return css`
        transform: translateX(0);
        opacity: 1;
      `;
    }
    if (transitionState === "exiting") {
      return css`
        transform: translateX(100px);
        opacity: 1;
      `;
    }
    if (transitionState === "entering") {
      return css`
        transition: 100ms ease-in-out;
        opacity: 1;
      `;
    }
  }}
`;

const InlineButton = styled.button`
  padding-inline: 5px;
  padding-block: 0;
  border: 0;
  border-radius: 4px;
  background-color: unset;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
  & > * {
    transform: translateY(-1px);
  }
`;

const Page = styled.article`
  margin: 1em auto 2em;
  max-width: 80vw;
  font-family: Arial, Helvetica, sans-serif;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 1em;
  }
`;

const Widget = styled.section`
  display: flex;
  ${Controls} {
    flex: 0 0 18em;
  }
  ${List} {
    flex: 1;
  }
  & > * + * {
    margin-left: 1em;
  }
`;

const createItem = (key: number) => ({
  color: toColorString({
    saturation: 0.8 + Math.random() / 10,
    lightness: 0.5 + Math.random() / 2,
    hue: Math.floor(Math.random() * 360),
  }),
  number: key,
  key: key,
});

const createList = (size = 10) => new Array(size).fill(null).map((_, idx) => createItem(idx + 1));

// function useStateAdapter<T extends number | string>(value: T, setValue: Dispatch<SetStateAction<T>>) {
//     console.log('calculating');
//     const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value as T), [setValue]);
//     return
// }

function* itemGenerator(): Generator<ReturnType<typeof createItem>, never, never> {
  let itemNumber = 1;
  while (true) {
    yield createItem(itemNumber++);
  }
}

const TransitionContext = React.createContext({});
const TransitionProvider = TransitionContext.Provider;
const TransitionRoot = ({ children }: { children: React.ReactChild }) => {
  const childIds = React.Children.map(children, (child) => child);
  console.log(childIds);
  return <TransitionProvider value={{}}></TransitionProvider>;
};

export default function Home() {
  const generator = useMemo(() => itemGenerator(), []);
  const [list, setList] = useState(() => new Array(10).fill(null).map(() => generator.next().value));
  const [numberOfItems, setNumberOfItems] = useState(1);
  const statefulList = useListTransition(list, {
    enterDelay: 100,
    exitDelay: 100,
  });
  return (
    <Page>
      <Widget>
        <Controls>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={numberOfItems}
            onChange={useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
              e.preventDefault();
              setNumberOfItems(Number(e.currentTarget.value));
            }, [])}
          />
          <button
            onClick={useCallback(
              () => setList([...list, ...new Array(numberOfItems).fill(null).map(() => generator.next().value)]),
              [list, generator, numberOfItems],
            )}>
            Add {numberOfItems} item
          </button>
          <button
            onClick={useCallback(() => {
              const newList = shuffle([...list]);
              setList((list) => list.filter((item) => newList.indexOf(item) < list.length - numberOfItems));
            }, [numberOfItems, list])}>
            Remove {numberOfItems} random items
          </button>
          <button
            onClick={useCallback(() => {
              setList((list) => [...shuffle(list)]);
            }, [])}>
            Shuffle
          </button>
        </Controls>
        <List>
          {statefulList.map(({ color, number, key, state }) => (
            <Item color={color} key={key} transitionState={state}>
              <span>
                Item {number} <i>({state})</i>
              </span>
              <InlineButton
                onClick={() => {
                  setList(list.filter((item) => item.key !== key));
                }}>
                <div>⨯</div>
              </InlineButton>
            </Item>
          ))}
        </List>
      </Widget>
    </Page>
  );
}
