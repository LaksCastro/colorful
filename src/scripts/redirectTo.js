let router = null;

let redirect = function (pathname) {
  if (pathname === router.pathname) return;
  router.redirectTo(process.env.PATH_BASE === "/" ? pathname : `${process.env.PATH_BASE}${pathname}`);
}

let init = function (routerInstance) {
  router = routerInstance;
}

export {
  redirect,
};

export default init;
