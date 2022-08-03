import React, { ComponentType, useState } from 'react';
import './App.css';

function App() {
  const [count, increment] = useCount();

  console.log('rendering app');

  return (
    <div className="App">
      <UncontrolledCounter />
      <ControlledCounter count={count} onIncrement={increment} />
      <HeadlessCounter>
        {(count, increment) => (
          <ControlledCounter count={count} onIncrement={increment} title="Headless Count" />
        )}
      </HeadlessCounter>
      <HeadlessCounter>
        {(count, increment) => (
          <p onClick={increment}>Mobile Count: {count}</p>
        )}
      </HeadlessCounter>
      <HighOrderCount title="High Order Count" />
    </div>
  );
}

export function UncontrolledCounter() {
  const [count, increment] = useCount();

  console.log(`rendering uncontrolled ${count}`);

  return (
    <>
      <h1>Uncontrolled Count</h1>
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    </>
  );
}

export function ControlledCounter({ title = 'Controlled Count', count, onIncrement }: {
  title?: string;
  count: number;
  onIncrement: () => void;
}) {

  console.log(`rendering ${title} ${count}`);

  return (
    <>
      <h1>{title}</h1>
      <div>
        <p>
          Count:
          {count}
        </p>
        <button onClick={onIncrement}>Increment</button>
      </div>
    </>
  );
}

export function useCount(start: number = 0): [number, () => void] {
  const [count, setCount] = useState(start);
  const increment = () => setCount((c) => c + 1);

  return [count, increment];
}

export function HeadlessCounter({ children }: {
  children: (count: number, increment: () => void) => JSX.Element;
}) {
  const [count, increment] = useCount();

  console.log(`rendering headless ${count}`);

  return children(count, increment);
}

type CountComponentProps = {
  count: number;
  onIncrement: () => void;
}

const withCount = <P extends CountComponentProps>(Component: ComponentType<P>) => function (props: Omit<P, 'count' | 'onIncrement'>) {
  const [count, increment] = useCount();

  const newProps = { ...props, count, onIncrement: increment };
  return (<Component {...newProps as P} />);
};

const HighOrderCount = withCount(ControlledCounter);

export default App;
