import { Branch } from '../../../../../types/branch';

export type BatchContentServerEventItem = {
    id: string;
    branch: Branch;
    path: {
        refString: string;
    };
};

// From lib-admin-ui
export enum NodeServerChangeType {
    UNKNOWN,
    PUBLISH,
    DUPLICATE,
    CREATE,
    UPDATE,
    DELETE,
    PENDING,
    RENAME,
    SORT,
    MOVE,
    UPDATE_PERMISSIONS,
}

type BatchContentServerEventDetail = {
    type: NodeServerChangeType;
    items?: BatchContentServerEventItem[];
    // We add this field to the event detail when an event should be
    // dispatched on behalf of the user via the alertbox dialog
    userTriggered?: true;
};

export const batchContentServerEventItemDidUpdate = (
    eventDetail: BatchContentServerEventDetail,
    contentId: string
) =>
    eventDetail?.items?.some(
        (item) =>
            item.id === contentId &&
            (item.branch === 'draft' ||
                eventDetail.type === NodeServerChangeType.PUBLISH ||
                eventDetail.type === NodeServerChangeType.DELETE)
    );

// New content objects are named '__unnamed__<uuid>' before they are given an actual
// name in the editor. We check for this to ensure events are dispatched correctly for
// newly created contents
const contentNamePlaceholderPrefix = '__unnamed__';

export const batchContentServerEventItemIsNew = (
    eventDetail: BatchContentServerEventDetail,
    contentId: string
) =>
    eventDetail?.items?.some(
        (item) =>
            item.id === contentId &&
            item.path.refString.includes(contentNamePlaceholderPrefix)
    );
