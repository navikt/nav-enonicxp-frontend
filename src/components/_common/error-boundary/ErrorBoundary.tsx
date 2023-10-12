import React, { Suspense } from 'react';

type Props = {
    fallback: React.ReactNode;
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
        const { children, fallback } = this.props;

        return <Suspense>{this.state.hasError ? fallback : children}</Suspense>;
    }
}
