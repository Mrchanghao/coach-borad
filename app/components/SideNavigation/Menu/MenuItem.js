import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'blueimp-md5';

import { MenuItemWrapper, MenuTitle, Img } from '../styles';

/*
pathnameList: ['/coaching'],
    link: '/coaching/seeds',
    img: renderResult(),
    selectedImg: renderSelectedResult(),
    imgAlt: '결과',
    title: 'Coaching'
*/

const MenuItem = ({
  curPathname,
  pathnameList,
  selectedImg,
  img,
  imgAlt,
  title,
}) => {
  // 의미?
  /*
  pathname 이 https://www.npmjs.com/package/blueimp-md5 일때
  regExp.exec(curPathname); 아래 행렬을 리턴
  ["/package", "/package", index: 0, input: "/package/blueimp-md5", groups: undefined]
  */
  const regExp = /(\/[-a-zA-Z0-9@:%._+~#=]*)/gm;
  console.log(curPathname);
  const regMatch = regExp.exec(curPathname);
  const selected =
    regMatch && regMatch.length > 0
      ? pathnameList.includes(regMatch[0])
      : false;
  return (
    <MenuItemWrapper id="22102078e718a48bf144b0411a74015f">
      {selected ? (
        <Img src={selectedImg} alt={imgAlt} />
      ) : (
        <Img src={img} alt={imgAlt} />
      )}
      <MenuTitle id={md5(`SideNavigation-MenuList-Item-Title-${title}`)}>
        {title}
      </MenuTitle>
    </MenuItemWrapper>
  );
};

MenuItem.propTypes = {
  curPathname: PropTypes.string,
  img: PropTypes.string,
  selectedImg: PropTypes.string,
  imgAlt: PropTypes.string,
  title: PropTypes.string,
  pathnameList: PropTypes.arrayOf(PropTypes.string),
};

export default MenuItem;
