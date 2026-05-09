"use client";

import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import clsx from "clsx";
import {
  LuChevronRight,
  LuGlobe,
  LuLoader,
  LuPackageCheck,
  LuShieldCheck,
} from "react-icons/lu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { checkout } from "@/checkout";

gsap.registerPlugin(useGSAP);

/**
 * Props for `PurchaseButton`.
 */
export type PurchaseButtonProps =
  SliceComponentProps<Content.PurchaseButtonSlice>;

/**
 * Component for "PurchaseButton" Slices.
 */
const PurchaseButton: FC<PurchaseButtonProps> = ({ slice }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handlePurchaseClick = async () => {
    setIsPressed(true);
    await checkout();
    setIsPressed(false);
  };

  useGSAP(() => {
    if (!buttonRef.current || !textRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current || !textRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = event.clientX - buttonRect.left;
      const buttonWidth = buttonRect.width;

      const normalizedX = Math.max(0, Math.min(1, mouseX / buttonWidth));

      const newWdth = 120 - normalizedX * 70; // 120 = thinner, 50 = wider
      const newWght = 700 + normalizedX * 300; // 700 = lighter, 1000 = bolder

      gsap.to(textRef.current, {
        "--wdth": newWdth,
        "--wght": newWght,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        "--wdth": 85,
        "--wght": 850,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    buttonRef.current?.addEventListener("mousemove", handleMouseMove);
    buttonRef.current?.addEventListener("mouseleave", handleMouseLeave);

    gsap.set(textRef.current, { "--wdth": 85, "--wght": 850 });

    return () => {
      if (buttonRef.current) {
        buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#f5f7f9]"
    >
      <FadeIn
        className="grid items-center gap-10 rounded-none py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-14"
        targetChildren
      >
        <div>
          <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-[#01A7E1] uppercase">
            {slice.primary.eyebrow}
          </p>

          <h2
            id="buy-button"
            className="font-bold-slanted scroll-pt-6 text-5xl leading-[0.9] text-gray-950 uppercase md:text-7xl"
          >
            <PrismicText field={slice.primary.heading} />
          </h2>

          <div className="mt-7 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ul className="mt-8 grid gap-3 text-sm font-medium text-gray-700 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <LuGlobe className="size-5 text-[#01A7E1]" />
              Worldwide shipping
            </li>
            <li className="flex items-center gap-2">
              <LuShieldCheck className="size-5 text-[#01A7E1]" />
              30-day guarantee
            </li>
            <li className="flex items-center gap-2">
              <LuPackageCheck className="size-5 text-[#01A7E1]" />
              2-year warranty
            </li>
          </ul>
        </div>

        <div className="relative isolate overflow-hidden rounded-lg bg-gray-950 p-4 shadow-2xl shadow-sky-950/20 md:p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#01A7E1] via-[#FFA631] to-[#01A7E1]" />
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-sm font-medium text-gray-400">Vapor Keyboard</p>
              <p className="font-bold-slanted text-3xl text-white uppercase md:text-5xl">
                Ready to build
              </p>
            </div>
            <div className="rounded bg-white px-3 py-2 text-right">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                In stock
              </p>
              <p className="text-lg font-black text-gray-950">Now</p>
            </div>
          </div>

          <button
            ref={buttonRef}
            onClick={handlePurchaseClick}
            disabled={isPressed}
            className={clsx(
              "group relative flex w-full items-center justify-between overflow-hidden rounded bg-linear-to-r from-[#01A7E1] to-[#0196C9] px-5 py-5 text-left ease-out focus:ring-4 focus:ring-[#01A7E1]/40 focus:outline-none motion-safe:transition-all motion-safe:duration-300 md:px-7 md:py-6",
              "hover:-translate-y-1 hover:shadow-xl hover:shadow-[#01A7E1]/25",
              "active:translate-y-0",
              isPressed
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer",
            )}
          >
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />

            <span
              ref={textRef}
              style={{ "--wdth": 85, "--wght": 850 } as React.CSSProperties}
              className="font-black-slanted relative z-10 text-3xl text-white uppercase motion-safe:transition-transform motion-safe:duration-300 md:text-5xl"
            >
              {isPressed ? (
                <span className="flex items-center gap-3">
                  <LuLoader className="size-8 animate-spin text-white" />
                  Loading...
                </span>
              ) : (
                slice.primary.button_text
              )}
            </span>

            {!isPressed && (
              <LuChevronRight className="relative z-10 size-9 text-white group-hover:translate-x-1 motion-safe:transition-transform" />
            )}
          </button>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            Secure checkout opens in a new Stripe session.
          </p>
        </div>
      </FadeIn>
    </Bounded>
  );
};

export default PurchaseButton;
