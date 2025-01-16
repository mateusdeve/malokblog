import React from 'react'

const Facebook = () => {
  return (
    <div className="mt-[3rem] border-t border-solid border-[#FFFFFF3D] lg:mt-[3rem]">
      <div className="mt-[2.19rem] lg:mt-[3.18rem]">
        <div id="fb-root"></div>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v21.0&appId=1463024787898104"
        ></script>
        <div className=" mx-auto flex items-center justify-center px-4 lg:px-0">
          <div className=" flex w-full justify-center rounded-[1.25rem] py-[50px]">
            <div
              className="fb-comments flex-important flex w-full justify-center px-[14px]"
              data-href="https://papodecodigo.vercel.app/"
              data-width=""
              data-lazy="true"
              data-colorscheme="light"
              data-numposts="10"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facebook
