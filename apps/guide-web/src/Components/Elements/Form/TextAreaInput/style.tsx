import styled from '@emotion/styled';

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
`;

export const TextArea = styled.textarea`
  height: 3rem;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 0.5rem;
  padding: 0 1rem;
  border-radius: 5px;
  resize: none;
  width: 75rem;
  height: 15rem;
  :focus {
    outline-style: none;
    box-shadow: none;
    border-color: ${({ theme }: any) => theme.colors.primary};
  }
  ::placeholder {
    font-size: 0.8rem;
    opacity: 0.8;
  }
`;
