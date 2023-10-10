import React, { Suspense } from 'react';
import { AlertBox } from 'components/_common/alert-box/AlertBox';

type Props = {
    errorMsg: string;
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(`Caught error: ${error} - ${errorInfo.componentStack}`);
    }

    render() {
        const { children, errorMsg } = this.props;

        return (
            <Suspense>
                {this.state.hasError ? (
                    <AlertBox variant={'error'} inline={true}>
                        {errorMsg}
                    </AlertBox>
                ) : (
                    children
                )}
            </Suspense>
        );
    }
}
