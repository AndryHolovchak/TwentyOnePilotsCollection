function bindMethods(thisContext, methodNames) {
  for (let methodName of methodNames) {
    thisContext[methodName] = thisContext[methodName].bind(thisContext);
  }
}

export { bindMethods };
