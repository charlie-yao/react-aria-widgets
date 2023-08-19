//Misc.
import type { VALID_HTML_HEADER_LEVELS } from './utils';

type DefaultProps<P> = Partial<P>;
type TPropTypes<P> = React.WeakValidationMap<P>;

export type ValidHTMLHeaderLevels = typeof VALID_HTML_HEADER_LEVELS[number];

export interface AsProp<C extends React.ElementType = React.ElementType> {
  as?: C;
}

export type PropsWithAs<C extends React.ElementType, P> = AsProp<C> & P;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  P
> = PropsWithAs<C, P> & Omit<React.ComponentPropsWithoutRef<C>, keyof PropsWithAs<C, P>>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  P
> = PropsWithAs<C, P> & Omit<React.ComponentPropsWithRef<C>, keyof PropsWithAs<C, P>>;

export interface PolymorphicForwardRefComponent<
  P,
  D extends React.ElementType = React.ElementType
> {
  <C extends React.ElementType = D>(
    props: PolymorphicComponentPropsWithRef<C, P>
  ): React.ReactNode;

  defaultProps?: DefaultProps<PolymorphicComponentPropsWithRef<React.ElementType, P>> | undefined;
  propTypes?: TPropTypes<PolymorphicComponentPropsWithRef<React.ElementType, P>> | undefined;
  displayName?: string | undefined;
}
