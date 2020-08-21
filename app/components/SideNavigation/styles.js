import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.mainColor};
  margin-right: 0px;
  height: calc(100% - 80px);
  width: 80px;
  position: fixed;
  left: 0;
  top: 80px;
  float: left;
  z-index: 999;
`;

export const MenuWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export const MenuTitle = styled.p`
  font-size: 30px;
  color: ${props =>
    props.isHighlight ? props.theme.pointColor : 'rgba(168, 168, 168, 1)'};
`;

export const MenuItemWrapper = styled.li`
  display: block;
  height: 80px;
  width: 80px;
  padding: 16px 0 16px 0;
  text-align: center;
  color: rgba(168, 168, 168, 1);
  cursor: pointer;
  &:hover > img {
    transform: scale(1.2);
  }
  > p {
    margin-top: 5px;
    font-size: 15px;
  }
  > img {
    transform: scale(1);
    transition: 0.3s ease-in-out;
  }
`;

export const Img = styled.img``;
