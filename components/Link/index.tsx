import React, { forwardRef, memo } from "react";
import NextLink from "next/link";
import MuiLink, { LinkBaseProps as MuiLinkProps } from "@material-ui/core/Link";
import clxs from "classnames";
import { useRouter } from "next/router";
import { NextLinkProps, LinkProps } from "./@types";

const NextComposed = forwardRef<HTMLAnchorElement, NextLinkProps>(
  (props, ref) => {
    const { as, href, prefetch, replace, ...rest } = props;

    return (
      <NextLink href={href} as={as} prefetch={prefetch} replace={replace}>
        <a ref={ref} {...rest} />
      </NextLink>
    );
  }
);

const InLink: React.ComponentType<LinkProps &
  Pick<MuiLinkProps, "color" | "classes" | "variant" | "noWrap">> = memo(
  ({
    className: classNameProps,
    naked,
    activeClassName = "active",
    innerRef,
    ...rest
  }) => {
    const router = useRouter();

    const className = clxs(classNameProps, {
      [activeClassName]: router.pathname === rest.href && activeClassName
    });

    if (naked) {
      const { color, variant, classes, ...others } = rest;

      return <NextComposed className={className} ref={innerRef} {...others} />;
    }

    return (
      <MuiLink
        component={NextComposed}
        className={className}
        ref={innerRef}
        {...rest}
      />
    );
  }
);

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & Pick<MuiLinkProps, "color" | "classes" | "variant" | "noWrap">
>((props, ref) => <InLink innerRef={ref} {...props} />);

export default Link;
