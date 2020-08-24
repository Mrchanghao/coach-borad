import styled from 'styled-components';

export const TabWrapper = styled.div`
  width: 100%;
  height: 45px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const TabItemWrapper = styled.div`
  background-color: white;
  display: inline-flex;
  padding-left: 20px;
`;

export const TabItem = styled.div`
  margin-right: 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(41, 59, 90);
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: ${props =>
    props.selectedKey === props.styleKey ? '3px solid rgb(41, 59, 90)' : null};
`;

export const TabButtonWrapper = styled.div`
  display: inline-flex;
`;

export const TabButton = styled.div`
  border: ${props =>
    props.selectedTypeKey === props.styleKey
      ? '1px solid rgb(0, 153, 254)'
      : '1px solid #a8a8a8'};
  color: ${props =>
    props.selectedTypeKey === props.styleKey ? 'rgb(0, 153, 254)' : '#a8a8a8'};
  border-radius: 10px;
  font-size: 13px;
  margin-right: 10px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
`;
