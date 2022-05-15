import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

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
    currentPageIndex,
    pages,
    paginationUpdateCallback,
}: PaginationProps) => {
    const { language } = usePageConfig();
    const getTranslationString = translator('pagination', language);

    const handlePaginationUpdate = (page: Page) => {
        paginationUpdateCallback(page.index);
    };

    return (
        <div className={styles.pagination}>
            <nav
                role="navigation"
                aria-label={getTranslationString('ariaExplanation')}
            >
                <ul className={styles.paginationList}>
                    {pages.map((page) => {
                        const isActive = page.index === currentPageIndex;

                        return (
                            <li key={page.index}>
                                <button
                                    type="button"
                                    onClick={() => handlePaginationUpdate(page)}
                                    aria-label={`${getTranslationString(
                                        'goTo'
                                    )} ${page.label}`}
                                    aria-current={isActive}
                                    className={classNames(
                                        styles.paginationButton,
                                        isActive && styles.activeButton
                                    )}
                                >
                                    {page.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
