import type { LayoutChangeEvent } from 'react-native';

interface DisplayProps {
  expression: string;
  result: string;
  handleLayout: (event: LayoutChangeEvent) => void;
}

interface ExpressionProps {
  type: string;
}

interface ResultProps {
  theme: string;
}

export type { DisplayProps, ExpressionProps, ResultProps };
