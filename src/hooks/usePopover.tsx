import { useState } from "react";
import {
    autoUpdate,
    offset,
    safePolygon,
    useFloating,
    useHover,
    useClick,
    useInteractions,
} from "@floating-ui/react";

interface Props {
    gap?: number;
    event?: Array<"hover" | "click">;
}

export const usePopover = ({ gap = 0, event = ["hover"] }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [offset(gap)],
    });

    const hover = useHover(context, {
        handleClose: safePolygon(),
    });

    const click = useClick(context, {
        event: "mousedown",
    });

    const interactionHooks = [event.includes("hover") ? hover : click];

    const { getReferenceProps, getFloatingProps } =
        useInteractions(interactionHooks);
    return {
        isOpen,
        refs,
        floatingStyles,
        context,
        getReferenceProps,
        getFloatingProps,
    };
};
