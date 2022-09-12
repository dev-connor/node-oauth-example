

  window.fbAsyncInit = () => {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    })
      
    FB.AppEvents.logPageView() 
  }

  ((d, s, id) => {
     const fjs = d.getElementsByTagName(s)[0]
     if (d.getElementById(id)) {
      return
    }
      
     const js = d.createElement(s); js.id = id
     js.src = "https://connect.facebook.net/en_US/sdk.js"
     fjs.parentNode.insertBefore(js, fjs)
   })(document, 'script', 'facebook-jssdk')
