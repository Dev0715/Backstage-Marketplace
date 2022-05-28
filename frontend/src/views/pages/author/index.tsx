import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import config from '../../../helper/config';
import Author from "./author";
import Profile from "./profile";

const PageAuthor = () => {

    const {userInfo} = useUserContext();
    const [background, setBackground] = useState<any>()
    const [wallet, setWallet] = useState<string>(userInfo?.user?.wallet_address);

    useEffect(() => {
        if (userInfo && userInfo.user.background) {
            const backgroundUrl = `${config.API_BASE_URL}/api/upload/get_file?path=${userInfo.user.background}`
            setBackground(backgroundUrl);
            setWallet(userInfo.user.wallet_address);
            console.log(backgroundUrl);
        } else {
            
        }
    }, [userInfo])

    return (
        <main className="main">
        <div className="main__author" 
            style={ background ? {backgroundImage: `url(${background})`} : {}}
            />
            <div className="container">
                <div className="row row--grid">
                    <Author wallet={wallet} setWallet={setWallet}/>
                    <Profile wallet={wallet} />
                </div>
            </div>
        </main>
    );
}

export default PageAuthor;
