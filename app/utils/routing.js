/* eslint-disable */
export function parseSearch(search) {
  // search 는 ?를 반드시 포함
  // ex ?courseId=3&now=2
  let query = {};
  const first = search.split('?'); // ["", "courseId=3&now=2"]
  if (first.length > 1) {
    const second = first[1].split('&'); // ["courseId=3", "now=2"];
    const third = second.map(ele => ({
      [ele.split('=')[0]]: decodeURIComponent(ele.split('=')[1]),
    }));
    for (let i = 0; i < third.length; i += 1) {
      query = {
        ...query,
        ...third[i],
      };
    }
  }
  return {
    ...query,
  };
}
export function pathStr2PathObj(pathnameWithQuery) {
  // pathnameWithQuery -> "/course?courseId=3&now=2"
  let pathname = '';
  let query = {};
  // first, second, third는 임의의 변수명, 의미없음
  const first = decodeURIComponent(pathnameWithQuery).split('?'); // first -> ["/course", "courseId=3&now=2"]
  pathname = first[0];
  // query가 존재하는경우
  if (first.length > 1) {
    // parseSearch는 앞에 물음표(?)가 필요하다.
    query = { ...parseSearch(`?${first[1]}`) };
  }
  return {
    pathname,
    query: { ...query },
  };
}
export function pathObj2PathStr({ pathname, query = undefined }) {
  let queryString = '';
  let pathStr = '';
  // in case of query object is blank object -> {}
  if (query && Object.keys(query).length > 0) {
    for (let i = 0; i < Object.keys(query).length; i += 1) {
      const qname = Object.keys(query)[i];
      queryString = `${queryString}${qname}=${query[qname]}`;
      if (i !== Object.keys(query).length - 1) queryString = `${queryString}&`;
    }
    pathStr = `${pathname}?${queryString}`;
  } else {
    pathStr = pathname;
  }
  return pathStr;
}

export function removeUrlParameter(url, parameter) {
  const urlParts = url.split('?');
  if (urlParts.length >= 2) {
    const urlBase = urlParts.shift();

    const queryString = urlParts.join('?');

    const prefix = `${encodeURIComponent(parameter)}=`;
    const parts = queryString.split(/[&;]/g);

    for (
      let i = parts.length;
      i-- > 0; // eslint-disable-line no-plusplus

    ) {
      // Idiom for string.startsWith
      if (parts[i].lastIndexOf(prefix, 0) !== -1) {
        parts.splice(i, 1);
      }
    }

    url = `${urlBase}?${parts.join('&')}`; // eslint-disable-line no-param-reassign
  }

  return url;
}
