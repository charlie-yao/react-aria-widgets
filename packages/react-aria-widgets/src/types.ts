//Misc.
import type { VALID_HTML_HEADER_LEVELS } from './utils';

export type Props = Record<string, any>; //eslint-disable-line @typescript-eslint/no-explicit-any
export type DefaultProps<P> = Partial<P>;
export type TPropTypes<P> = React.WeakValidationMap<P>;

export type ValidHTMLHeaderLevels = typeof VALID_HTML_HEADER_LEVELS[number];

export type AllowedElements<
  C extends React.ElementType,
  V extends React.ElementType = React.ElementType
> = C extends V ? C : never;

export interface AsProp<
  C extends React.ElementType,
  V extends React.ElementType = React.ElementType
> {
  as?: AllowedElements<C, V>;
}

export type PropsWithAs<
  C extends React.ElementType,
  P,
  V extends React.ElementType = React.ElementType
> = AsProp<C, V> & P;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  P,
  V extends React.ElementType = React.ElementType
> = PropsWithAs<C, P, V> & Omit<React.ComponentPropsWithoutRef<C>, keyof PropsWithAs<C, P, V>>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  P,
  V extends React.ElementType = React.ElementType
> = PropsWithAs<C, P, V> & Omit<React.ComponentPropsWithRef<C>, keyof PropsWithAs<C, P, V>>;

export interface PolymorphicForwardRefComponent<
  P,
  V extends React.ElementType = React.ElementType,
  D extends React.ElementType = React.ElementType
> {
  <C extends React.ElementType = D>(
    props: PolymorphicComponentPropsWithRef<C, P, V>
  ): React.ReactNode;

  defaultProps?: DefaultProps<PolymorphicComponentPropsWithRef<React.ElementType, P, V>> | undefined;
  propTypes?: TPropTypes<PolymorphicComponentPropsWithRef<React.ElementType, P, V>> | undefined;
  displayName?: string | undefined;
}
