import React, { useRef } from 'react';

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
  //): (props: React.PropsWithoutRef<P> & React.RefAttributes<T>) => React.ReactElement | null
}

type HTMLTagsAllowed<C extends React.ElementType, V extends React.ElementType> = C extends V ? C : never;

type AsProp<C extends React.ElementType, V extends React.ElementType> = {
  as?: HTMLTagsAllowed<C, V>;
};

type PropsWithAs<C extends React.ElementType, P, V extends React.ElementType> = AsProp<C, V> & P;

type PropsToOmit<C extends React.ElementType, P, V extends React.ElementType> = keyof PropsWithAs<C, P, V>;

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props extends Record<string, unknown>,
  V extends React.ElementType
> = React.PropsWithChildren<
  Props &
  AsProp<C, V> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props, V>>
>

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props extends Record<string, unknown>,
  V extends React.ElementType
> = PolymorphicComponentProps<C, Props, V> & { ref?: PolymorphicRef<C> }

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

const ForwardedPanel = React.forwardRef(Panel) as React.ForwardRefExoticComponent;

ForwardedPanel.propTypes = {
};

ForwardedPanel.defaultProps = {
};

function App() {
  const testSectionRef = useRef<HTMLElement | null>(null);
  const testDivRef = useRef<HTMLDivElement | null>(null);
  const testButtonRef = useRef<HTMLButtonElement | null>(null);
  const testGenericRef = useRef<HTMLElement | null>(null);
  const testFormRef = useRef<HTMLFormElement | null>(null);
  const testUListRef = useRef(null);
  const testInputRef = useRef<HTMLInputElement | null>(null);
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
