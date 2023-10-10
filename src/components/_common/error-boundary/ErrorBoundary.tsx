import React, { Suspense } from 'react';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { Language, translator } from 'translations';

export type ErrorBoundaryType = 'component';

type Props = {
    type: ErrorBoundaryType;
    language: Language;
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
        const { type, children, language } = this.props;

        return (
            <Suspense>
                {this.state.hasError ? (
                    <AlertBox variant={'error'} inline={true}>
                        {translator('errors', language)(type)}
                    </AlertBox>
                ) : (
                    children
                )}
            </Suspense>
        );
    }
}
