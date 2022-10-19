import { PageBase } from 'components/PageBase';
import { getStaticProps as getStaticPropsMaster } from 'pages/[...pathRouter]';

export const getStaticProps = getStaticPropsMaster;

export default PageBase;

// We define a separate page for the index, as the next.js ISR cache does not seem to handle the revalidate period
// correctly for the index in optional catch-all routes
