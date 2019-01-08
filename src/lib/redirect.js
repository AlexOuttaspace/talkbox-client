import Router from 'next/router'

export const redirect = (context, target, { hard } = { hard: false }) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    if (hard) {
      return window.locations.assign('/login')
    }
    // In the browser, we just pretend like this never even happened ;)
    return Router.replace(target)
  }
}
