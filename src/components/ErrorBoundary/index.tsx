import * as React from 'react';

export interface ErrorBoundaryProps {
  children: JSX.Element | JSX.Element[];
  renderErrorView?: (error: any, info: any) => null | JSX.Element | JSX.Element[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
  info: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true, error, info});
  }

  render() {
    const {
      hasError,
      error,
      info,
    } = this.state;
    const {
      children,
      renderErrorView,
    } = this.props;
    if (hasError) {
      return (typeof renderErrorView === 'function') ? renderErrorView(error, info) : null;
    }
    return children;
  }
}

export default ErrorBoundary;
