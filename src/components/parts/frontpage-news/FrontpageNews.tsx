import { NewsCard } from 'components/_common/card/NewsCard';
import { Header } from 'components/_common/headers/Header';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { FrontpageNewsProps } from 'types/component-props/parts/frontpage-news';
import { formatDate } from 'utils/datetime';
import { getPublicPathname } from 'utils/urls';

import style from './FrontpageNews.module.scss';

export const FrontpageNews = ({ config }: FrontpageNewsProps) => {
    const { newsList, title } = config;
    const { language } = usePageConfig();

    return (
        <div className={style.frontpageNews}>
            <Header
                size="large"
                level="2"
                justify="left"
                className={style.header}
            >
                {title}
            </Header>
            <div className={style.newsList}>
                {newsList.map((item) => (
                    <NewsCard
                        link={{
                            text: item.displayName,
                            url: getPublicPathname(item),
                        }}
                        dateTag={formatDate(item.modifiedTime, language)}
                        key={item._id}
                        className={style.newsItem}
                    />
                ))}
            </div>
        </div>
    );
};
