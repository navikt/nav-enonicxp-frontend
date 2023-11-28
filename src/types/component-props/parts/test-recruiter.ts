import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

type TestVariant = {
    testName: string;
    percentage: number;
    url: string;
    title?: string;
    ingress?: string;
};

export interface TestRecruiterPartProps extends PartComponentProps {
    descriptor: PartType.TestRecruiter;
    config: Partial<{
        tests: {
            data: {
                items: TestVariant[];
                title: string;
                ingress: string;
                testGroupId: string;
                startTime: string;
                endTime: string;
            };
        };
        selectedTests: string[];
    }>;
}
