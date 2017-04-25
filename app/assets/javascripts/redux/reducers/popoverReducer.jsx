import { POPOVER_ANCHOR, POPOVER_CONTENT, POPOVER_OPEN, POPOVER_ADD } from './../types';

const init = {
    anchor: null,
    content: null,
    open: false
};

const updateField = (state, object, property, data) => {
    if (state.popovers[object]) {
        return {
            ...state,
            popovers: {
                ...state.popovers,
                [object]: {
                    ...state.popovers[object],
                    [property]: data
                }
            }
        }
    } else {
        return {
            ...state,
            popovers: { ...state.popovers, [object]: {...init, [property]: data}}
        }
    }
};

const popoverReducer = (state = {
    popovers: []
}, action) => {
    switch (action.type) {
        case POPOVER_ANCHOR:
            return updateField(state, action.object, 'anchor', action.anchor);
        case POPOVER_CONTENT:
            return updateField(state, action.object, 'content', action.content);
        case POPOVER_OPEN:
            return updateField(state, action.object, 'open', action.open);
        case POPOVER_ADD:
            return {
                ...state,
                popovers: {
                    ...state.popovers,
                    [action.popover]: {
                        ...init
                    }
                }
            };
        default:
            return state;
    }
};

export default popoverReducer;
