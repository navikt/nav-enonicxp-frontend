import React, { Suspense } from 'react';
import { ContentProps } from 'types/content-props/_content-common';

type Props = {
    editorView: ContentProps['editorView'];
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
        const { children, fallback, editorView } = this.props;

        const componentToRender = this.state.hasError ? fallback : children;

        // The content studio component editor does not play nice with suspense boundaries
        // Suspense causes components to sometimes become unselectable for some reason...
        if (editorView === 'edit') {
            return componentToRender;
        }

        return <Suspense>{componentToRender}</Suspense>;
    }
}
