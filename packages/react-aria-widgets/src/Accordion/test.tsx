import React from 'react';

type HTMLTagsAllowed<C extends React.ElementType, V> = C extends V ? C : never;

type AsProp<C extends React.ElementType, V> = {
  as?: HTMLTagsAllowed<C, V>;
};

type PropsWithAs<C extends React.ElementType, P, V> = AsProp<C, V> & P;

type PropsToOmit<C extends React.ElementType, P, V> = keyof PropsWithAs<C, P, V>;

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = Record<string, unknown>,
  V extends React.ElementType = React.ElementType
> = React.PropsWithChildren<
  Props &
  AsProp<C, V> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props, V>>
>

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props,
  V extends React.ElementType = React.ElementType
> = PolymorphicComponentProps<C, Props, V> & { ref?: PolymorphicRef<C> }

type PanelProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    id: string;
    labelId: string;
  },
  'section' | 'div' | 'button' | 'a'
>;

type PanelComponent = <C extends React.ElementType = 'section'>(
  props: PanelProps<C>
) => React.ReactElement | null;

const Panel: PanelComponent = React.forwardRef(<C extends React.ElementType = 'section'>(
  { as, children,  ...rest }: PanelProps<C>,
  ref?: PolymorphicRef<C>
) => {
  const Component = as || 'section';
  
  return <Component {...rest} ref={ ref }>{ children }</Component>
});

function App() {
  return (
    <>
      <Panel as="section" id="test" labelId="testLabel">hello world!</Panel>
      <Panel as="section" id="test" labelId="testLabel" type="button">dd</Panel>
      <Panel as="button" id="test" labelId="testLabel" type="button">dd</Panel>
      <Panel as="button" id="test" labelId="testLabel" type="asdfsubmit">dd</Panel>
      <Panel as="div" id="test" labelId="testLabel" href="#">dd</Panel>
      <Panel as="a" id="test" labelId="testLabel" href="#">dd</Panel>
      <Panel as="bdiv" id="test" labelId="testLabel" href="#">dd</Panel>
    </>
  );
}
