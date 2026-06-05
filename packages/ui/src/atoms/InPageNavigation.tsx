"use client";

import * as React from "react";
import MuiList from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import type { ListProps as MuiListProps } from "@mui/material/List";
import type { ListItemButtonProps as MuiListItemButtonProps } from "@mui/material/ListItemButton";

export type InPageNavigationProps = MuiListProps & {
  scrollOffset?: number;
};

export type InPageNavigationItemProps = MuiListItemButtonProps &
  Pick<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "target" | "rel"
  >;

function getHashFromHref(href?: string) {
  if (!href?.startsWith("#")) {
    return undefined;
  }

  return href;
}

function getTargetElement(hash?: string) {
  if (!hash) {
    return null;
  }

  return document.getElementById(decodeURIComponent(hash.slice(1)));
}

export function InPageNavigation({
  children,
  scrollOffset = 24,
  sx,
  ...props
}: InPageNavigationProps) {
  const [activeHref, setActiveHref] = React.useState("");
  const childArray = React.useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const itemHrefs = React.useMemo(
    () =>
      childArray
        .filter(React.isValidElement<InPageNavigationItemProps>)
        .map((child) => getHashFromHref(child.props.href))
        .filter((href): href is string => Boolean(href)),
    [childArray],
  );

  const firstHref = itemHrefs[0];
  const currentHref = activeHref || firstHref;

  React.useEffect(() => {
    if (itemHrefs.length === 0) {
      return undefined;
    }

    let frameId = 0;

    function syncActiveByScroll() {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        let nextActiveHref = firstHref;
        let closestDistance = Number.POSITIVE_INFINITY;

        for (let index = 0; index < itemHrefs.length; index += 1) {
          const href = itemHrefs[index];
          const target = getTargetElement(href);

          if (!target) {
            continue;
          }

          const rect = target.getBoundingClientRect();
          const isVisible =
            rect.bottom > scrollOffset && rect.top < window.innerHeight;
          const distance = Math.abs(rect.top - scrollOffset);

          // 현재 화면에 보이는 섹션 중 sticky 기준점에 가장 가까운 항목을 활성화
          if (isVisible && distance < closestDistance) {
            nextActiveHref = href;
            closestDistance = distance;
          }
        }
        setActiveHref(nextActiveHref ?? "");
      });
    }

    syncActiveByScroll();
    window.addEventListener("resize", syncActiveByScroll);
    document.addEventListener("scroll", syncActiveByScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", syncActiveByScroll);
      document.removeEventListener("scroll", syncActiveByScroll, {
        capture: true,
      });
    };
  }, [firstHref, itemHrefs, scrollOffset]);

  return (
    <MuiList
      component="nav"
      aria-label="in-page navigation"
      {...props}
      sx={[
        {
          position: "sticky",
          top: scrollOffset,
        },
      ]}
    >
      {childArray.map((child) => {
        if (!React.isValidElement<InPageNavigationItemProps>(child)) {
          return child;
        }

        const href = getHashFromHref(child.props.href);

        return React.cloneElement(child, {
          selected:
            child.props.selected ?? (href != null && href === currentHref),
          onClick: (event) => {
            child.props.onClick?.(event);

            if (event.defaultPrevented || !href) {
              return;
            }

            const target = getTargetElement(href);

            if (!target) {
              setActiveHref(href);
              return;
            }

            event.preventDefault();
            setActiveHref(href);
            target.scrollIntoView({ block: "start" });
          },
        });
      })}
    </MuiList>
  );
}

export function InPageNavigationItem({ ...props }: InPageNavigationItemProps) {
  return <MuiListItemButton component="a" {...props} />;
}
