import { Heading, Tag } from '@navikt/ds-react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';

type Page = {
    label: string;
    index: number;
};

interface PaginationProps {
    currentPageIndex: number;
    pages: Page[];
    paginationUpdateCallback: (page: number) => void;
}

export const Pagination = ({
    paginationUpdateCallback,
    currentPageIndex,
    pages,
}: PaginationProps) => {
    const handlePaginationUpdate = (page: Page) => {
        paginationUpdateCallback(page.index);
    };

    return (
        <div className={styles.pagination}>
            {pages.map((page) => {
                const isActive = page.index === currentPageIndex;

                return (
                    <button
                        key={page.index}
                        type="button"
                        onClick={() => handlePaginationUpdate(page)}
                        className={classNames(
                            styles.paginationButton,
                            isActive && styles.activeButton
                        )}
                    >
                        {page.label}
                    </button>
                );
            })}
        </div>
    );
};
