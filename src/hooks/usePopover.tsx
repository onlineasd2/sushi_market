import { useState } from "react";
import {
    autoUpdate,
    offset,
    safePolygon,
    useFloating,
    useHover,
    useInteractions,
} from "@floating-ui/react";

export const usePopover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const GAP = 14;

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [offset(GAP)],
    });

    const hover = useHover(context, {
        handleClose: safePolygon(),
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return {
        isOpen,
        refs,
        floatingStyles,
        context,
        getReferenceProps,
        getFloatingProps,
    };
};
