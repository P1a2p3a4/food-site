import React from 'react'
import "./Appdownload.css"

const AppDownload = () => {
    return (


        <div className='app-download' id='app-download'>
            <h1>For Better Expreince Download Craving App</h1>

            <div className='app-download-icons'>
                <a href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" target="_blank">
                    <img src="/src/assets/food-list/play.jpg" alt="play" />
                </a>


                <a href="https://apps.apple.com/app/idYOUR_APP_ID" target="_blank">
                    <img className='app' src="/src/assets/food-list/app.jpg" alt="apple" />
                </a>
            </div>

        </div >



    )
}

export default AppDownload
