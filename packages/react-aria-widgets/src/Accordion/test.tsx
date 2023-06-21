import React, { useRef } from 'react';

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.ForwardedRef<T>) => React.ReactNode
  ): (props: P & React.RefAttributes<T>) => React.ReactElement
}

type AllowedElements<
  C extends React.ElementType,
  V extends React.ElementType = React.ElementType
> = C extends V ? C : never;

type AsProp<
  C extends React.ElementType,
  V extends React.ElementType = React.ElementType
> = {
  as?: AllowedElements<C, V>;
};

type PropsWithAs<
  C extends React.ElementType,
  P,
  V extends React.ElementType = React.ElementType
> = AsProp<C, V> & P;

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  P,
  V extends React.ElementType = React.ElementType
> = PropsWithAs<C, P, V> &  Omit<React.ComponentPropsWithoutRef<C>, keyof PropsWithAs<C, P, V>>;

type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  P,
  V extends React.ElementType = React.ElementType
> = PolymorphicComponentPropsWithoutRef<C, P, V> & { ref?: PolymorphicRef<C> }

type PanelProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    id: string;
    labelId: string;
  },
  'section' | 'div' | 'button' | 'a' | 'form' | 'ul' | 'input'
>;

function Panel<E, C extends React.ElementType = 'section'>(
  { as, children, ...rest }: PanelProps<C>,
  ref: React.ForwardedRef<E>
) {
  const Component = as ? as : 'section';
  return <Component { ...rest } ref={ ref }>{children}</Component>;
}

type ForwardedPanelType = <C extends React.ElementType = 'section'>(
  props: PanelProps<C>
) => React.ReactElement | null;

//const ForwardedPanel: ForwardedPanelType = React.forwardRef(Panel);
const ForwardedPanel = React.forwardRef(Panel);

const Blah = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ name: string }>>((
  { name, children },
  ref
) => {
  return <div ref={ ref } id={ name }>{ children }</div>
});

//(ForwardedPanel as React.ForwardRefExoticComponent<React.PropsWithoutRef<{ id: string, labelId: string }> & React.RefAttributes<HTMLElement>>).propTypes = {
(ForwardedPanel as React.ComponentType).propTypes = {
};

(ForwardedPanel as React.ComponentType).defaultProps = {
};

function App() {
  const testSectionRef = useRef<HTMLElement>(null);
  const testDivRef = useRef<HTMLDivElement>(null);
  const testButtonRef = useRef<HTMLButtonElement>(null);
  const testGenericRef = useRef<HTMLElement>(null);
  const testFormRef = useRef<HTMLFormElement>(null);
  const testUListRef = useRef<HTMLUListElement>(null);
  const testInputRef = useRef<HTMLInputElement>(null);
  const testUntypedInputRef = useRef(null);

  return (
    <>
      <Panel as="section" id="test" labelId="testLabel">hello world!</Panel>
      <Panel as="section" id="test" labelId="testLabel" type="button">dd</Panel>
      <Panel as="button" id="test" labelId="testLabel" type="button">dd</Panel>
      <Panel as="button" id="test" labelId="testLabel" type="asdfsubmit">dd</Panel>
      <Panel as="div" id="test" labelId="testLabel" href="#">dd</Panel>
      <Panel as="a" id="test" labelId="testLabel" href="#">dd</Panel>
      <Panel as="bdiv" id="test" labelId="testLabel" href="#">dd</Panel>
      <ForwardedPanel ref={testSectionRef} as="section" id="test" labelId="testLabel">hello world!</ForwardedPanel>
      <ForwardedPanel ref={testButtonRef} as="section" id="test" labelId="testLabel" type="button">dd</ForwardedPanel>

      { /* The type checking should be stricter here */ }
      <ForwardedPanel ref={testButtonRef} as="section" id="test" labelId="testLabel">dd</ForwardedPanel>

      <Blah ref={testButtonRef} name="lol">lol</Blah>
      <Blah ref={testDivRef} name="rofl">rofl</Blah>

      <ForwardedPanel as="section" id="test" labelId="testLabel">dd</ForwardedPanel>
      <ForwardedPanel ref={testButtonRef} as="button" id="test" labelId="testLabel" type="button">dd</ForwardedPanel>
      <ForwardedPanel ref={testButtonRef} as="div" id="test" labelId="testLabel" type="button">dd</ForwardedPanel>
      <ForwardedPanel ref={testButtonRef} as="button" id="test" labelId="testLabel" type="asdfsubmit">dd</ForwardedPanel>
      <ForwardedPanel ref={testDivRef} as="div" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testFormRef} as="a" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testFormRef} as="form" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testGenericRef} as="bdiv" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testUListRef} as="bdiv" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testUListRef} as="ul" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testUListRef} as="ul" id="test" labelId="testLabel">dd</ForwardedPanel>
      <ForwardedPanel ref={testButtonRef} as="ul" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testDivRef} as="ul" id="test" labelId="testLabel" href="#">dd</ForwardedPanel>
      <ForwardedPanel ref={testInputRef} as="input" id="test" labelId="testLabel">dd</ForwardedPanel>
      <ForwardedPanel ref={testUntypedInputRef} as="input" id="test" labelId="testLabel">dd</ForwardedPanel>
      <ForwardedPanel ref={null} as="input" id="test" labelId="testLabel">dd</ForwardedPanel>
    </>
  );
}
