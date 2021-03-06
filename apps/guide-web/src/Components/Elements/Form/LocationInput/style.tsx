import styled from '@emotion/styled';

export const StyledWrapper = styled.div`
  & .react-autosuggest__container {
    position: relative;
    margin-bottom: 2rem;
  }

  & .react-autosuggest__input {
    padding: 0.5rem 0.7rem;
    width: 100%;
    font-size: 0.8rem;

    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 0.8rem;
    border: 1px solid #aaa;
    border-radius: 4px;

    ::placeholder {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  & .react-autosuggest__input--focused {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }

  & .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  & .react-autosuggest__suggestions-container {
    display: none;
  }

  & .react-autosuggest__suggestions-container--open {
    width: 100%;
    display: block;
    position: absolute;
    top: 51px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 1rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  & .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  & .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  & .react-autosuggest__suggestion--highlighted {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;
