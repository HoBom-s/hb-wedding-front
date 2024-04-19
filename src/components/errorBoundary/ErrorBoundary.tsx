import {
  Component,
  ComponentPropsWithRef,
  ErrorInfo,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

interface FallbackProps<ErrorType extends Error = Error> {
  error: ErrorType;
  reset: () => void;
}

type FallbackType = <ErrorType extends Error>(
  props: FallbackProps<ErrorType>,
) => ReactNode;

interface Props<ErrorType extends Error = Error> {
  /**
   * Error가 발생했을 때 어떠한 Component를 Render할지 결정하도록 한다.
   */
  fallback: FallbackType;

  /**
   * ErrorBoundary에서 Catch한 Error인 경우
   * 어떠한 이벤트를 호출할지 정의하도록 한다.
   */
  onError?: (error: ErrorType, info: ErrorInfo) => void;

  /**
   * ErrorBoundary의 Error가 초기화 되면 호출되는 함수를 정의한다.
   */
  onResetError?: () => void;
}

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState = {
  error: null,
};

class BaseErrorBoundary extends Component<
  PropsWithRef<PropsWithChildren<Props>>,
  State
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;

    onError?.(error, errorInfo);
  }

  resetState() {
    this.setState(initialState);
  }

  resetErrorBoundary() {
    this.props.onResetError?.();
    this.resetState();
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (error) {
      return fallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

export const ErrorBoundary = forwardRef<
  { reset(): void },
  ComponentPropsWithRef<typeof BaseErrorBoundary>
>((props, resetRef) => {
  const ref = useRef<BaseErrorBoundary>(null);

  useImperativeHandle(resetRef, () => ({
    reset: () => ref.current?.resetErrorBoundary(),
  }));

  return <BaseErrorBoundary ref={ref} {...props} />;
});
