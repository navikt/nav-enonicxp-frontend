import { TestRecruiterPartProps } from 'types/component-props/parts/test-recruiter';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

type TestsConfig = TestRecruiterPartProps['config'];

const getApplicableVariants = (testsConfig: TestsConfig) => {
    const { tests, selectedTests } = testsConfig;
};

export const TestRecruiterPart = ({ config }: TestRecruiterPartProps) => {
    if (!config?.tests?.data) {
        return <EditorHelp text={'Velg en test-gruppering'} type={'error'} />;
    }

    const { tests, selectedTests } = config;

    const { testGroupId, ingress, items, title, startTime, endTime } =
        tests.data;

    return null;
};
