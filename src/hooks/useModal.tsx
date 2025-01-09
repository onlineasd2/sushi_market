import {
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    useId,
    useFloating,
    autoPlacement,
} from "@floating-ui/react";
import { useState } from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [autoPlacement()],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context, {
        outsidePressEvent: "mousedown",
    });
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    const labelId = useId();
    const descriptionId = useId();

    return {
        isOpen,
        setIsOpen,
        refs,
        labelId,
        descriptionId,
        context,
        getReferenceProps,
        getFloatingProps,
    };
};
