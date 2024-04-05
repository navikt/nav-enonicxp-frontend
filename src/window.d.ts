import {
    OVERVIEW_FILTERS_TEXT_INPUT_EVENT,
    OverviewFiltersTextInputEventDetail,
} from './store/slices/overviewFilters';

declare global {
    interface Window {
        GoBrain?: {
            create: (element: HTMLElement, config: Record<string, any>) => any;
            destroy: (widgetId: string, deleteElement?: boolean) => any;
            widgets: (widgetId: string) => any;
        };
    }

    interface WindowEventMap {
        [OVERVIEW_FILTERS_TEXT_INPUT_EVENT]: CustomEvent<OverviewFiltersTextInputEventDetail>;
    }
}

export {};
