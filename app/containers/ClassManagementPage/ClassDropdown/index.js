import React, { useState, useEffect, Fragment } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// semantic-ui
import { Dropdown } from 'semantic-ui-react';
import { parseSearch } from 'utils/routing';
import { withRouter } from 'react-router-dom';
import { DropWrapper, LoadingWrapper } from './styles';

const ClassDropdown = ({
  push,
  match,
  alpsClassList,
  alpsClassListLoading,
  onChangeSelectedAlpsClass,
}) => {
  const [classIdObj, setClassIdObj] = useState(
    parseSearch(window.location.search),
  );

  useEffect(() => {
    setClassIdObj(parseSearch(window.location.search));
  }, [window.location.search]);

  useEffect(() => {
    if (alpsClassList.length === 0) return;
    try {
      const initialAlpsClassName = alpsClassList[0].name;
      let initialClassId;
      if (classIdObj.classId) {
        initialClassId = Number(alpsClassList[0].id);
      }
      selectNewClass(initialAlpsClassName, initialClassId);
      console.log(classIdObj);
      // eslint-disable-next-line no-empty
    } catch (error) {}

    // setClassIdObj()
  }, [alpsClassList]);

  const selectNewClass = (newClassName, newclassId) => {
    const filteredClass = alpsClassList.filter(
      alpsClass => alpsClass.id === newclassId,
    );
    const newAlpsClass = filteredClass[0];

    onChangeSelectedAlpsClass(newAlpsClass);
  };

  const onChangeDropdown = (e, data) => {
    const classIndex = data.options.findIndex(x => x.value === data.value);
    const newClassObj = data.options[classIndex].obj;
    onChangeSelectedAlpsClass(newClassObj);
    const { manageType } = match.params;
    const learningProgressType = parseLearningProgressTypeUrl();

    if (
      manageType === 'learning-progress' &&
      learningProgressType === 'level'
    ) {
      push(`${match.url}/course/?classId=${newClassObj.id}`);
    } else {
      push(`${window.location.pathname}?classId=${newClassObj.id}`);
    }
  };

  const parseLearningProgressTypeUrl = () => {
    const { pathname } = window.location;
    const parsedArr = pathname.split('/');
    const learningProgressType = parsedArr[3];
    return learningProgressType;
  };

  const renderDropdown = () => {
    if (alpsClassList.length !== 0) {
      const alpsClassListJs = alpsClassList;
      // select options data --> 각 선택 항목을 객체화 한다
      // [{key, value, text, obj}]
      const classOptions = alpsClassListJs.map(data => ({
        key: data.id,
        value: data.id,
        text: data.name,
        obj: { id: data.id, name: data.name },
      }));
      return (
        <DropWrapper>
          {alpsClassListLoading ? (
            <LoadingWrapper>코스 로딩 중</LoadingWrapper>
          ) : (
            <Dropdown
              search
              selection
              options={classOptions}
              defaultValue={Number(classIdObj.classId) || classOptions[0].value}
              onChange={onChangeDropdown}
            />
          )}
        </DropWrapper>
      );
    }
    // alpsclasslist 의 length 가 0일때
    return (
      <DropWrapper>
        {alpsClassListLoading ? '코스 로딩 중' : '존재 하지 않습니다'}
      </DropWrapper>
    );
  };

  return <Fragment>{renderDropdown()}</Fragment>;
};

export default withRouter(ClassDropdown);

ClassDropdown.propTypes = {
  push: PropTypes.func,
  alpsClassList: PropTypes.array,
  alpsClassListLoading: PropTypes.bool,
  onChangeSelectedAlpsClass: PropTypes.func,
  match: PropTypes.object,
};
