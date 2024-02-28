import type {
  MotionBlurLoaderVariantProps,
  MotionBlurLoaderSlots,
  SlotsToClasses,
} from "@nextui-org/theme";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system-rsc";

import {mapPropsVariants} from "@nextui-org/system-rsc";
import {motionBlurLoader} from "@nextui-org/theme";
import {clsx} from "@nextui-org/shared-utils";
import {useMemo, useCallback, Ref} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLElement | null>;
  /**
   * MotionBlurLoader label, in case you passed it will be used as `aria-label`.
   */
  label?: string;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <MotionBlurLoader classNames={{
   *    base:"base-classes",
   *    wrapper: "wrapper-classes",
   *    circle1: "circle1-classes",
   *    circle2: "circle2-classes",
   *    circle3: "circle3-classes",
   *    label: "label-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<MotionBlurLoaderSlots>;
}

export type UseMotionBlurLoaderProps = Props & MotionBlurLoaderVariantProps;

export function useMotionBlurLoader(originalProps: UseMotionBlurLoaderProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, motionBlurLoader.variantKeys);

  const {children, className, classNames, label: labelProp, ...otherProps} = props;

  const slots = useMemo(
    () => motionBlurLoader({...variantProps}),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(classNames?.base, className);

  const label = labelProp || children;

  const ariaLabel = useMemo(() => {
    if (label && typeof label === "string") {
      return label;
    }

    return !otherProps["aria-label"] ? "Loading" : "";
  }, [children, label, otherProps["aria-label"]]);

  const getMotionBlurLoaderProps = useCallback<PropGetter>(
    () => ({
      "aria-label": ariaLabel,
      className: slots.base({
        class: baseStyles,
      }),
      ...otherProps,
    }),
    [ariaLabel, slots, baseStyles, otherProps],
  );

  return {label, slots, classNames, getMotionBlurLoaderProps};
}

export type UseMotionBlurLoaderReturn = ReturnType<typeof useMotionBlurLoader>;