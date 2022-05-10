import styled from '@emotion/styled';

type styleProps = {
  theme?: {
    colors: {
      primary: string;
    };
  };
};

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 0.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  font-size: 0.8rem;

  :focus {
    outline-style: none;
    box-shadow: none;
    border-color: ${(props: styleProps) => props.theme.colors.primary};
  }

  ::placeholder {
    font-size: 1.4rem;
    opacity: 0.6;
  }
`;

export const Label = styled.label`
  font-family: inherit;
  font-size: 0.8rem;
  color: ${(props: styleProps) => props.theme.colors.primary};
`;
