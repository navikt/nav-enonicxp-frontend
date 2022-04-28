import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import '../global.less';
import '../components.less';

// Import scss that aren't modules
import 'components/layouts/fixed-cols/FixedColsLayout.scss';
import 'components/layouts/flex-cols/FlexColsLayout.scss';
import 'components/layouts/legacy/LegacyLayout.scss';
import 'components/layouts/page-with-side-menus/left-menu-section/LeftMenuSection.scss';
import 'components/layouts/page-with-side-menus/PageWithSideMenus.scss';
import 'components/layouts/section-with-header/SectionWithHeaderLayout.scss';
import 'components/pages/situation-page/SituationPage.scss';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default App;
