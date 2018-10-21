// Some of the reasoning behind including this can be found here: 
// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
// https://github.com/facebook/react/issues/5465#issuecomment-157888325

export default function makeCancelable(promise) {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
}