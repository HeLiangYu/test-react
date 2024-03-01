import { pathToRegexp } from "path-to-regexp";

export default function matchPath(path, pathname, options) {
  const keys = [];
  const regExp = pathToRegexp(path, keys, getOptions(options));
  const result = regExp.exec(pathname);

  if (!result) {
    return;
  }

  const groups = Array.prototype.slice.call(result, 1);

  const params = getParams(groups, keys);
  return {
    isExact: pathname === result[0],
    params,
    path,
    url: result[0],
  };
}

console.log(matchPath("/n/:id/:o", "/n/k/i"));

function getOptions(options = {}) {
  const defaultOptions = {
    exact: false,
    sensitive: false,
    strict: false,
  };

  const opts = {
    ...defaultOptions,
    ...options,
  };

  return {
    sensitive: opts.sensitive,
    strict: opts.strict,
    end: opts.exact,
  };
}

function getParams(groups, keys) {
  const obj = {};
  groups.forEach((val, i) => {
    const { name } = keys[i];
    obj[name] = val;
  });

  return obj;
}
