interface DetailsDropdownProps {
  title: string;
  placeholder: string;
  value: string;
  onSelection: (value: string) => void;
  isValid: boolean;
  errorMessage: string;
  options: string[];
}