import { GetServerSideProps } from 'next';
import { rssFeedApi } from '../rss';

export const getServerSideProps: GetServerSideProps = rssFeedApi;

const DummyComponent = () => null;

export default DummyComponent;
