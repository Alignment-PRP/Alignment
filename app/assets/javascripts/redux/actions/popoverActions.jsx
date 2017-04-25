import { POPOVER_ANCHOR, POPOVER_CONTENT, POPOVER_OPEN, POPOVER_ADD } from './../types';

export function popoverAnchor(object, anchor) {
    return {
        type: POPOVER_ANCHOR,
        object: object,
        anchor: anchor
    }
}

export function popoverContent(object, content) {
    return {
        type: POPOVER_CONTENT,
        object: object,
        content: content
    }
}

export function popoverOpen(object, open) {
    return {
        type: POPOVER_OPEN,
        object: object,
        open: open
    }
}

export function popoverAdd(popover) {
    return {
        type: POPOVER_ADD,
        popover: popover
    }
}
